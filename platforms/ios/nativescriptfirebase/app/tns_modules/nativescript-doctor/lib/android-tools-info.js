"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const constants_1 = require("./constants");
const os_1 = require("os");
const semver = require("semver");
const path = require("path");
class AndroidToolsInfo {
    constructor(childProcess, fs, hostInfo) {
        this.childProcess = childProcess;
        this.fs = fs;
        this.hostInfo = hostInfo;
        this.androidHome = process.env["ANDROID_HOME"];
    }
    getToolsInfo() {
        if (!this.toolsInfo) {
            const infoData = Object.create(null);
            infoData.androidHomeEnvVar = this.androidHome;
            infoData.compileSdkVersion = this.getCompileSdk();
            infoData.buildToolsVersion = this.getBuildToolsVersion();
            infoData.supportRepositoryVersion = this.getAndroidSupportRepositoryVersion();
            this.toolsInfo = infoData;
        }
        return this.toolsInfo;
    }
    validateInfo() {
        const errors = [];
        const toolsInfoData = this.getToolsInfo();
        const isAndroidHomeValid = this.isAndroidHomeValid();
        if (!toolsInfoData.compileSdkVersion) {
            errors.push({
                warning: `Cannot find a compatible Android SDK for compilation. To be able to build for Android, install Android SDK ${AndroidToolsInfo.MIN_REQUIRED_COMPILE_TARGET} or later.`,
                additionalInformation: `Run \`\$ ${this.getPathToSdkManagementTool()}\` to manage your Android SDK versions.`,
                platforms: [constants_1.Constants.ANDROID_PLATFORM_NAME]
            });
        }
        if (!toolsInfoData.buildToolsVersion) {
            const buildToolsRange = this.getBuildToolsRange();
            const versionRangeMatches = buildToolsRange.match(/^.*?([\d\.]+)\s+.*?([\d\.]+)$/);
            let message = `You can install any version in the following range: '${buildToolsRange}'.`;
            if (versionRangeMatches && versionRangeMatches[1] && versionRangeMatches[2] && versionRangeMatches[1] === versionRangeMatches[2]) {
                message = `You have to install version ${versionRangeMatches[1]}.`;
            }
            let invalidBuildToolsAdditionalMsg = `Run \`\$ ${this.getPathToSdkManagementTool()}\` from your command-line to install required \`Android Build Tools\`.`;
            if (!isAndroidHomeValid) {
                invalidBuildToolsAdditionalMsg += ' In case you already have them installed, make sure `ANDROID_HOME` environment variable is set correctly.';
            }
            errors.push({
                warning: "You need to have the Android SDK Build-tools installed on your system. " + message,
                additionalInformation: invalidBuildToolsAdditionalMsg,
                platforms: [constants_1.Constants.ANDROID_PLATFORM_NAME]
            });
        }
        if (!toolsInfoData.supportRepositoryVersion) {
            let invalidSupportLibAdditionalMsg = `Run \`\$ ${this.getPathToSdkManagementTool()}\` to manage the Android Support Repository.`;
            if (!isAndroidHomeValid) {
                invalidSupportLibAdditionalMsg += ' In case you already have it installed, make sure `ANDROID_HOME` environment variable is set correctly.';
            }
            errors.push({
                warning: `You need to have Android SDK ${AndroidToolsInfo.MIN_REQUIRED_COMPILE_TARGET} or later and the latest Android Support Repository installed on your system.`,
                additionalInformation: invalidSupportLibAdditionalMsg,
                platforms: [constants_1.Constants.ANDROID_PLATFORM_NAME]
            });
        }
        return errors;
    }
    validateJavacVersion(installedJavaVersion) {
        const errors = [];
        let additionalMessage = "You will not be able to build your projects for Android." + os_1.EOL
            + "To be able to build for Android, verify that you have installed The Java Development Kit (JDK) and configured it according to system requirements as" + os_1.EOL +
            " described in " + this.getSystemRequirementsLink();
        let matchingVersion = (installedJavaVersion || "").match(AndroidToolsInfo.VERSION_REGEX);
        if (matchingVersion && matchingVersion[1]) {
            if (semver.lt(matchingVersion[1], AndroidToolsInfo.MIN_JAVA_VERSION)) {
                errors.push({
                    warning: `Javac version ${installedJavaVersion} is not supported. You have to install at least ${AndroidToolsInfo.MIN_JAVA_VERSION}.`,
                    additionalInformation: additionalMessage,
                    platforms: [constants_1.Constants.ANDROID_PLATFORM_NAME]
                });
            }
        }
        else {
            errors.push({
                warning: "Error executing command 'javac'. Make sure you have installed The Java Development Kit (JDK) and set JAVA_HOME environment variable.",
                additionalInformation: additionalMessage,
                platforms: [constants_1.Constants.ANDROID_PLATFORM_NAME]
            });
        }
        return errors;
    }
    getPathToAdbFromAndroidHome() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.androidHome) {
                let pathToAdb = path.join(this.androidHome, "platform-tools", "adb");
                try {
                    yield this.childProcess.execFile(pathToAdb, ["help"]);
                    return pathToAdb;
                }
                catch (err) {
                    return null;
                }
            }
            return null;
        });
    }
    validateAndroidHomeEnvVariable() {
        const errors = [];
        const expectedDirectoriesInAndroidHome = ["build-tools", "tools", "platform-tools", "extras"];
        if (!this.androidHome || !this.fs.exists(this.androidHome)) {
            errors.push({
                warning: "The ANDROID_HOME environment variable is not set or it points to a non-existent directory. You will not be able to perform any build-related operations for Android.",
                additionalInformation: "To be able to perform Android build-related operations, set the `ANDROID_HOME` variable to point to the root of your Android SDK installation directory.",
                platforms: [constants_1.Constants.ANDROID_PLATFORM_NAME]
            });
        }
        else if (expectedDirectoriesInAndroidHome.map(dir => this.fs.exists(path.join(this.androidHome, dir))).length === 0) {
            errors.push({
                warning: "The ANDROID_HOME environment variable points to incorrect directory. You will not be able to perform any build-related operations for Android.",
                additionalInformation: "To be able to perform Android build-related operations, set the `ANDROID_HOME` variable to point to the root of your Android SDK installation directory, " +
                    "where you will find `tools` and `platform-tools` directories.",
                platforms: [constants_1.Constants.ANDROID_PLATFORM_NAME]
            });
        }
        return errors;
    }
    getPathToEmulatorExecutable() {
        if (!this.pathToEmulatorExecutable) {
            const emulatorExecutableName = "emulator";
            this.pathToEmulatorExecutable = emulatorExecutableName;
            if (this.androidHome) {
                const pathToEmulatorFromAndroidStudio = path.join(this.androidHome, emulatorExecutableName, emulatorExecutableName);
                const realFilePath = this.hostInfo.isWindows ? `${pathToEmulatorFromAndroidStudio}.exe` : pathToEmulatorFromAndroidStudio;
                if (this.fs.exists(realFilePath)) {
                    this.pathToEmulatorExecutable = pathToEmulatorFromAndroidStudio;
                }
                else {
                    this.pathToEmulatorExecutable = path.join(this.androidHome, "tools", emulatorExecutableName);
                }
            }
        }
        return this.pathToEmulatorExecutable;
    }
    getPathToSdkManagementTool() {
        const sdkmanagerName = "sdkmanager";
        let sdkManagementToolPath = sdkmanagerName;
        const isAndroidHomeValid = this.isAndroidHomeValid();
        if (isAndroidHomeValid) {
            const pathToSdkmanager = path.join(this.androidHome, "tools", "bin", sdkmanagerName);
            const pathToAndroidExecutable = path.join(this.androidHome, "tools", "android");
            const pathToExecutable = this.fs.exists(pathToSdkmanager) ? pathToSdkmanager : pathToAndroidExecutable;
            sdkManagementToolPath = pathToExecutable.replace(this.androidHome, this.hostInfo.isWindows ? "%ANDROID_HOME%" : "$ANDROID_HOME");
        }
        return sdkManagementToolPath;
    }
    getCompileSdk() {
        let latestValidAndroidTarget = this.getLatestValidAndroidTarget();
        if (latestValidAndroidTarget) {
            let integerVersion = this.parseAndroidSdkString(latestValidAndroidTarget);
            if (integerVersion && integerVersion >= AndroidToolsInfo.MIN_REQUIRED_COMPILE_TARGET) {
                return integerVersion;
            }
        }
    }
    getMatchingDir(pathToDir, versionRange) {
        let selectedVersion;
        if (this.fs.exists(pathToDir)) {
            let subDirs = this.fs.readDirectory(pathToDir);
            let subDirsVersions = subDirs
                .map(dirName => {
                let dirNameGroups = dirName.match(AndroidToolsInfo.VERSION_REGEX);
                if (dirNameGroups) {
                    return dirNameGroups[1];
                }
                return null;
            })
                .filter(dirName => !!dirName);
            let version = semver.maxSatisfying(subDirsVersions, versionRange);
            if (version) {
                selectedVersion = subDirs.find(dir => dir.indexOf(version) !== -1);
            }
        }
        return selectedVersion;
    }
    getBuildToolsRange() {
        return `${AndroidToolsInfo.REQUIRED_BUILD_TOOLS_RANGE_PREFIX} <=${this.getMaxSupportedVersion()}`;
    }
    getBuildToolsVersion() {
        let buildToolsVersion;
        if (this.androidHome) {
            let pathToBuildTools = path.join(this.androidHome, "build-tools");
            let buildToolsRange = this.getBuildToolsRange();
            buildToolsVersion = this.getMatchingDir(pathToBuildTools, buildToolsRange);
        }
        return buildToolsVersion;
    }
    getAppCompatRange() {
        let compileSdkVersion = this.getCompileSdk();
        let requiredAppCompatRange;
        if (compileSdkVersion) {
            requiredAppCompatRange = `>=${compileSdkVersion} <${compileSdkVersion + 1}`;
        }
        return requiredAppCompatRange;
    }
    getAndroidSupportRepositoryVersion() {
        let selectedAppCompatVersion;
        const requiredAppCompatRange = this.getAppCompatRange();
        if (this.androidHome && requiredAppCompatRange) {
            const pathToAppCompat = path.join(this.androidHome, "extras", "android", "m2repository", "com", "android", "support", "appcompat-v7");
            selectedAppCompatVersion = this.getMatchingDir(pathToAppCompat, requiredAppCompatRange);
        }
        return selectedAppCompatVersion;
    }
    getLatestValidAndroidTarget() {
        const installedTargets = this.getInstalledTargets();
        let latestValidAndroidTarget;
        const sortedAndroidToolsInfo = AndroidToolsInfo.SUPPORTED_TARGETS.sort();
        sortedAndroidToolsInfo.forEach(s => {
            if (installedTargets.indexOf(s) >= 0) {
                latestValidAndroidTarget = s;
            }
        });
        return latestValidAndroidTarget;
    }
    parseAndroidSdkString(androidSdkString) {
        return parseInt(androidSdkString.replace(`${AndroidToolsInfo.ANDROID_TARGET_PREFIX}-`, ""));
    }
    getInstalledTargets() {
        try {
            const pathToInstalledTargets = path.join(this.androidHome, "platforms");
            if (!this.fs.exists(pathToInstalledTargets)) {
                throw new Error("No Android Targets installed.");
            }
            return this.fs.readDirectory(pathToInstalledTargets);
        }
        catch (err) {
            return [];
        }
    }
    getMaxSupportedVersion() {
        return this.parseAndroidSdkString(AndroidToolsInfo.SUPPORTED_TARGETS.sort()[AndroidToolsInfo.SUPPORTED_TARGETS.length - 1]);
    }
    getSystemRequirementsLink() {
        let linkToSystemRequirements;
        switch (process.platform) {
            case "linux":
                linkToSystemRequirements = "http://docs.nativescript.org/setup/ns-cli-setup/ns-setup-linux.html#system-requirements";
                break;
            case "win32":
                linkToSystemRequirements = "http://docs.nativescript.org/setup/ns-cli-setup/ns-setup-win.html#system-requirements";
                break;
            case "darwin":
                linkToSystemRequirements = "http://docs.nativescript.org/setup/ns-cli-setup/ns-setup-os-x.html#system-requirements";
                break;
            default:
                linkToSystemRequirements = "";
        }
        return linkToSystemRequirements;
    }
    isAndroidHomeValid() {
        const errors = this.validateAndroidHomeEnvVariable();
        return !errors && !errors.length;
    }
}
AndroidToolsInfo.ANDROID_TARGET_PREFIX = "android";
AndroidToolsInfo.SUPPORTED_TARGETS = ["android-17", "android-18", "android-19", "android-21", "android-22", "android-23", "android-24", "android-25"];
AndroidToolsInfo.MIN_REQUIRED_COMPILE_TARGET = 22;
AndroidToolsInfo.REQUIRED_BUILD_TOOLS_RANGE_PREFIX = ">=23";
AndroidToolsInfo.VERSION_REGEX = /((\d+\.){2}\d+)/;
AndroidToolsInfo.MIN_JAVA_VERSION = "1.8.0";
exports.AndroidToolsInfo = AndroidToolsInfo;
