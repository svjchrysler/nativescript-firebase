"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const os_1 = require("os");
const path = require("path");
const osenv = require("osenv");
const temp = require("temp");
const semver = require("semver");
class SysInfo {
    constructor(childProcess, fileSystem, helpers, hostInfo, winReg, androidToolsInfo) {
        this.childProcess = childProcess;
        this.fileSystem = fileSystem;
        this.helpers = helpers;
        this.hostInfo = hostInfo;
        this.winReg = winReg;
        this.androidToolsInfo = androidToolsInfo;
        this.monoVerRegExp = /version (\d+[.]\d+[.]\d+) /gm;
        this.shouldCache = true;
    }
    getJavaVersion() {
        return this.getValueForProperty(() => this.javaVerCache, () => __awaiter(this, void 0, void 0, function* () {
            try {
                const spawnResult = yield this.childProcess.spawnFromEvent("java", ["-version"], "exit");
                const matches = spawnResult && SysInfo.JAVA_VERSION_REGEXP.exec(spawnResult.stderr);
                return matches && matches[1];
            }
            catch (err) {
                return null;
            }
        }));
    }
    getJavaCompilerVersion() {
        return this.getValueForProperty(() => this.javaCompilerVerCache, () => __awaiter(this, void 0, void 0, function* () {
            const javaCompileExecutableName = "javac";
            const javaHome = process.env.JAVA_HOME;
            const pathToJavaCompilerExecutable = javaHome ? path.join(javaHome, "bin", javaCompileExecutableName) : javaCompileExecutableName;
            try {
                const output = yield this.childProcess.exec(`"${pathToJavaCompilerExecutable}" -version`);
                return SysInfo.JAVA_COMPILER_VERSION_REGEXP.exec(output.stderr)[1];
            }
            catch (err) {
                return null;
            }
        }));
    }
    getXcodeVersion() {
        return this.getValueForProperty(() => this.xCodeVerCache, () => __awaiter(this, void 0, void 0, function* () {
            if (this.hostInfo.isDarwin) {
                const output = yield this.execCommand("xcodebuild -version");
                const xcodeVersionMatch = output && output.match(SysInfo.XCODE_VERSION_REGEXP);
                if (xcodeVersionMatch) {
                    return this.getVersionFromString(output);
                }
            }
        }));
    }
    getNodeVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getValueForProperty(() => this.nodeVerCache, () => __awaiter(this, void 0, void 0, function* () {
                const output = yield this.execCommand("node -v");
                if (output) {
                    const version = this.getVersionFromString(output);
                    return version || output;
                }
                return null;
            }));
        });
    }
    getNpmVersion() {
        return this.getValueForProperty(() => this.npmVerCache, () => __awaiter(this, void 0, void 0, function* () {
            const output = yield this.execCommand("npm -v");
            return output ? output.split("\n")[0] : null;
        }));
    }
    getNodeGypVersion() {
        return this.getValueForProperty(() => this.nodeGypVerCache, () => __awaiter(this, void 0, void 0, function* () {
            const output = yield this.execCommand("node-gyp -v");
            return output ? this.getVersionFromString(output) : null;
        }));
    }
    getXcodeprojGemLocation() {
        return this.getValueForProperty(() => this.xCodeprojGemLocationCache, () => __awaiter(this, void 0, void 0, function* () {
            const output = yield this.execCommand("gem which xcodeproj");
            return output ? output.trim() : null;
        }));
    }
    isITunesInstalled() {
        return this.getValueForProperty(() => this.iTunesInstalledCache, () => __awaiter(this, void 0, void 0, function* () {
            if (this.hostInfo.isLinux) {
                return false;
            }
            let coreFoundationDir;
            let mobileDeviceDir;
            if (this.hostInfo.isWindows) {
                const commonProgramFiles = this.hostInfo.isWindows64 ? process.env["CommonProgramFiles(x86)"] : process.env.CommonProgramFiles;
                coreFoundationDir = path.join(commonProgramFiles, "Apple", "Apple Application Support");
                mobileDeviceDir = path.join(commonProgramFiles, "Apple", "Mobile Device Support");
            }
            else if (this.hostInfo.isDarwin) {
                coreFoundationDir = "/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation";
                mobileDeviceDir = "/System/Library/PrivateFrameworks/MobileDevice.framework/MobileDevice";
            }
            return (yield this.fileSystem.exists(coreFoundationDir)) && (yield this.fileSystem.exists(mobileDeviceDir));
        }));
    }
    getCocoaPodsVersion() {
        return this.getValueForProperty(() => this.cocoaPodsVerCache, () => __awaiter(this, void 0, void 0, function* () {
            if (this.hostInfo.isDarwin) {
                if (this.hostInfo.isDarwin) {
                    const output = yield this.execCommand("pod --version");
                    const cocoaPodsVersionMatch = output && output.match(SysInfo.VERSION_REGEXP);
                    if (cocoaPodsVersionMatch && cocoaPodsVersionMatch[0]) {
                        return cocoaPodsVersionMatch[0].trim();
                    }
                }
            }
        }));
    }
    getOs() {
        return this.getValueForProperty(() => this.osCache, () => __awaiter(this, void 0, void 0, function* () {
            return yield (this.hostInfo.isWindows ? this.winVer() : this.unixVer());
        }));
    }
    getAdbVersion() {
        return this.getValueForProperty(() => this.adbVerCache, () => __awaiter(this, void 0, void 0, function* () {
            let output = null;
            const pathToAdbFromAndroidHome = yield this.androidToolsInfo.getPathToAdbFromAndroidHome();
            if (pathToAdbFromAndroidHome) {
                output = yield this.childProcess.spawnFromEvent(pathToAdbFromAndroidHome, ["version"], "close", { ignoreError: true });
            }
            return output && output.stdout ? this.getVersionFromString(output.stdout) : null;
        }));
    }
    isAndroidInstalled() {
        return this.getValueForProperty(() => this.androidInstalledCache, () => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = this.androidToolsInfo.validateAndroidHomeEnvVariable();
                return errors.length === 0;
            }
            catch (err) {
                return false;
            }
        }));
    }
    isAndroidSdkConfiguredCorrectly() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getValueForProperty(() => this.isAndroidSdkConfiguredCorrectlyCache, () => __awaiter(this, void 0, void 0, function* () {
                const output = yield this.childProcess.spawnFromEvent(this.androidToolsInfo.getPathToEmulatorExecutable(), ["-help"], "close", { ignoreError: true });
                return output && output.stdout.indexOf("usage: emulator") >= 0;
            }));
        });
    }
    getMonoVersion() {
        return this.getValueForProperty(() => this.monoVerCache, () => __awaiter(this, void 0, void 0, function* () {
            const output = yield this.execCommand("mono --version");
            const match = this.monoVerRegExp.exec(output);
            return match ? match[1] : null;
        }));
    }
    getGitVersion() {
        return this.getValueForProperty(() => this.gitVerCache, () => __awaiter(this, void 0, void 0, function* () {
            const gitPath = yield this.getGitPath();
            if (!gitPath) {
                return null;
            }
            const output = yield this.execCommand(`${this.helpers.quoteString(gitPath)} --version`);
            const matches = SysInfo.GIT_VERSION_REGEXP.exec(output);
            return matches && matches[1];
        }));
    }
    getGradleVersion() {
        return this.getValueForProperty(() => this.gradleVerCache, () => __awaiter(this, void 0, void 0, function* () {
            const output = yield this.execCommand("gradle -v");
            const matches = SysInfo.GRADLE_VERSION_REGEXP.exec(output);
            return matches && matches[1];
        }));
    }
    getSysInfo() {
        return this.getValueForProperty(() => this.sysInfoCache, () => __awaiter(this, void 0, void 0, function* () {
            const result = Object.create(null);
            result.platform = os_1.platform();
            result.shell = osenv.shell();
            result.os = yield this.getOs();
            result.procArch = process.arch;
            result.nodeVer = yield this.getNodeVersion();
            result.npmVer = yield this.getNpmVersion();
            result.nodeGypVer = yield this.getNodeGypVersion();
            result.dotNetVer = yield this.hostInfo.dotNetVersion();
            result.javaVer = yield this.getJavaVersion();
            result.javacVersion = yield this.getJavaCompilerVersion();
            result.xcodeVer = yield this.getXcodeVersion();
            result.xcodeprojGemLocation = yield this.getXcodeprojGemLocation();
            result.itunesInstalled = yield this.isITunesInstalled();
            result.cocoaPodsVer = yield this.getCocoaPodsVersion();
            result.adbVer = yield this.getAdbVersion();
            result.androidInstalled = yield this.isAndroidInstalled();
            result.monoVer = yield this.getMonoVersion();
            result.gitVer = yield this.getGitVersion();
            result.gradleVer = yield this.getGradleVersion();
            result.isCocoaPodsWorkingCorrectly = yield this.isCocoaPodsWorkingCorrectly();
            result.nativeScriptCliVersion = yield this.getNativeScriptCliVersion();
            result.nativeScriptCloudVersion = yield this.getNativeScriptCloudVersion();
            result.isCocoaPodsUpdateRequired = yield this.isCocoaPodsUpdateRequired();
            result.isAndroidSdkConfiguredCorrectly = yield this.isAndroidSdkConfiguredCorrectly();
            return result;
        }));
    }
    isCocoaPodsWorkingCorrectly() {
        return this.getValueForProperty(() => this.isCocoaPodsWorkingCorrectlyCache, () => __awaiter(this, void 0, void 0, function* () {
            if (this.hostInfo.isDarwin) {
                temp.track();
                const tempDirectory = temp.mkdirSync("nativescript-check-cocoapods");
                const pathToXCodeProjectZip = path.join(__dirname, "..", "resources", "cocoapods-verification", "cocoapods.zip");
                yield this.fileSystem.extractZip(pathToXCodeProjectZip, tempDirectory);
                const xcodeProjectDir = path.join(tempDirectory, "cocoapods");
                try {
                    let spawnResult = yield this.childProcess.spawnFromEvent("pod", ["install"], "exit", { spawnOptions: { cwd: xcodeProjectDir } });
                    if (spawnResult.exitCode) {
                        return false;
                    }
                    else {
                        return yield this.fileSystem.exists(path.join(xcodeProjectDir, "cocoapods.xcworkspace"));
                    }
                }
                catch (err) {
                    return null;
                }
            }
            else {
                return false;
            }
        }));
    }
    getNativeScriptCliVersion() {
        return this.getValueForProperty(() => this.nativeScriptCliVersionCache, () => __awaiter(this, void 0, void 0, function* () {
            const output = yield this.execCommand("tns --version");
            return output ? output.trim() : output;
        }));
    }
    getNativeScriptCloudVersion() {
        return this.getValueForProperty(() => this.nativeScriptCloudVersionCache, () => __awaiter(this, void 0, void 0, function* () {
            const output = yield this.execCommand("tns cloud lib version");
            return output ? this.getVersionFromString(output.trim()) : output;
        }));
    }
    getXcprojInfo() {
        return this.getValueForProperty(() => this.xcprojInfoCache, () => __awaiter(this, void 0, void 0, function* () {
            const cocoaPodsVersion = yield this.getCocoaPodsVersion();
            const xcodeVersion = yield this.getXcodeVersion();
            const shouldUseXcproj = cocoaPodsVersion && !!(semver.lt(cocoaPodsVersion, "1.0.0") && semver.gte(xcodeVersion, "7.3.0"));
            let xcprojAvailable;
            if (shouldUseXcproj) {
                xcprojAvailable = !!(yield this.exec("xcproj --version"));
            }
            return { shouldUseXcproj, xcprojAvailable };
        }));
    }
    isCocoaPodsUpdateRequired() {
        return this.getValueForProperty(() => this.isCocoaPodsUpdateRequiredCache, () => __awaiter(this, void 0, void 0, function* () {
            let xcprojInfo = yield this.getXcprojInfo();
            if (xcprojInfo.shouldUseXcproj && !xcprojInfo.xcprojAvailable) {
                return true;
            }
            else {
                return false;
            }
        }));
    }
    setShouldCacheSysInfo(shouldCache) {
        this.shouldCache = shouldCache;
    }
    getGitPath() {
        return this.hostInfo.isWindows ? this.findGitWin32() : this.findGitUnix();
    }
    findGitWin32() {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            const win32Paths = [process.env["ProgramFiles"], process.env["ProgramFiles(x86)"]];
            for (const win32Path of win32Paths) {
                result = this.findSystemGitWin32(win32Path);
                if (result) {
                    return result;
                }
            }
            result = this.findGitHubGitWin32();
            return result ? result : yield this.findGitCore("where");
        });
    }
    findSystemGitWin32(base) {
        if (!base) {
            return null;
        }
        return this.findSpecificGit(path.join(base, "Git", "cmd", "git.exe"));
    }
    findGitHubGitWin32() {
        const github = path.join(process.env["LOCALAPPDATA"], "GitHub");
        if (!this.fileSystem.exists(github)) {
            return null;
        }
        const children = this.fileSystem.readDirectory(github);
        const git = children.filter(child => /^PortableGit/.test(child))[0];
        if (!this.fileSystem.exists(git)) {
            return null;
        }
        return this.findSpecificGit(path.join(github, git, "cmd", "git.exe"));
    }
    findSpecificGit(gitPath) {
        return this.fileSystem.exists(gitPath) ? gitPath : null;
    }
    findGitUnix() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findGitCore("which");
        });
    }
    findGitCore(command, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.execCommand(`${command} git`);
            return result && result.split("\n")[0].trim();
        });
    }
    getValueForProperty(property, getValueMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.shouldCache) {
                const propertyName = this.helpers.getPropertyName(property);
                const cachedValue = this[propertyName];
                if (cachedValue === undefined) {
                    const result = yield getValueMethod();
                    this[propertyName] = result;
                    return result;
                }
                else {
                    return cachedValue;
                }
            }
            else {
                return yield getValueMethod();
            }
        });
    }
    exec(cmd, execOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cmd) {
                try {
                    return yield this.childProcess.exec(cmd, execOptions);
                }
                catch (err) {
                    return null;
                }
            }
            return null;
        });
    }
    execCommand(cmd, execOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const output = yield this.exec(cmd, execOptions);
            return output && output.stdout;
        });
    }
    getVersionFromString(versionString) {
        const matches = versionString.match(SysInfo.VERSION_REGEXP);
        if (matches) {
            return `${matches[1]}.${matches[2]}.${matches[3] || 0}`;
        }
        return null;
    }
    winVer() {
        return __awaiter(this, void 0, void 0, function* () {
            let productName;
            let currentVersion;
            let currentBuild;
            const hive = this.winReg.registryKeys.HKLM;
            const key = "\\Software\\Microsoft\\Windows NT\\CurrentVersion";
            productName = yield this.winReg.getRegistryValue("ProductName", hive, key);
            currentVersion = yield this.winReg.getRegistryValue("CurrentVersion", hive, key);
            currentBuild = yield this.winReg.getRegistryValue("CurrentBuild", hive, key);
            return `${productName} ${currentVersion}.${currentBuild}`;
        });
    }
    unixVer() {
        return this.execCommand("uname -a");
    }
}
SysInfo.JAVA_VERSION_REGEXP = /(?:openjdk|java) version \"((?:\d+\.)+(?:\d+))/i;
SysInfo.JAVA_COMPILER_VERSION_REGEXP = /^javac (.*)/im;
SysInfo.XCODE_VERSION_REGEXP = /Xcode (.*)/;
SysInfo.VERSION_REGEXP = /(\d{1,})\.(\d{1,})\.*([\w-]{0,})/m;
SysInfo.GIT_VERSION_REGEXP = /^git version (.*)/;
SysInfo.GRADLE_VERSION_REGEXP = /Gradle (.*)/i;
exports.SysInfo = SysInfo;
