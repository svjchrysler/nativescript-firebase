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
class Doctor {
    constructor(androidLocalBuildRequirements, helpers, hostInfo, iOSLocalBuildRequirements, sysInfo, androidToolsInfo) {
        this.androidLocalBuildRequirements = androidLocalBuildRequirements;
        this.helpers = helpers;
        this.hostInfo = hostInfo;
        this.iOSLocalBuildRequirements = iOSLocalBuildRequirements;
        this.sysInfo = sysInfo;
        this.androidToolsInfo = androidToolsInfo;
    }
    canExecuteLocalBuild(platform) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validatePlatform(platform);
            if (platform.toLowerCase() === constants_1.Constants.ANDROID_PLATFORM_NAME.toLowerCase()) {
                return yield this.androidLocalBuildRequirements.checkRequirements();
            }
            else if (platform.toLowerCase() === constants_1.Constants.IOS_PLATFORM_NAME.toLowerCase()) {
                return yield this.iOSLocalBuildRequirements.checkRequirements();
            }
            return false;
        });
    }
    getWarnings() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            const sysInfoData = yield this.sysInfo.getSysInfo();
            const androidHomeValidationErrors = this.androidToolsInfo.validateAndroidHomeEnvVariable();
            if (androidHomeValidationErrors.length > 0) {
                result = result.concat(androidHomeValidationErrors);
            }
            if (!sysInfoData.adbVer) {
                result.push({
                    warning: "WARNING: adb from the Android SDK is not installed or is not configured properly. ",
                    additionalInformation: "For Android-related operations, the NativeScript CLI will use a built-in version of adb." + os_1.EOL
                        + "To avoid possible issues with the native Android emulator, Genymotion or connected" + os_1.EOL
                        + "Android devices, verify that you have installed the latest Android SDK and" + os_1.EOL
                        + "its dependencies as described in http://developer.android.com/sdk/index.html#Requirements" + os_1.EOL,
                    platforms: [constants_1.Constants.ANDROID_PLATFORM_NAME]
                });
            }
            if (!sysInfoData.isAndroidSdkConfiguredCorrectly) {
                result.push({
                    warning: "WARNING: The Android SDK is not installed or is not configured properly.",
                    additionalInformation: "You will not be able to run your apps in the native emulator. To be able to run apps" + os_1.EOL
                        + "in the native Android emulator, verify that you have installed the latest Android SDK " + os_1.EOL
                        + "and its dependencies as described in http://developer.android.com/sdk/index.html#Requirements" + os_1.EOL,
                    platforms: [constants_1.Constants.ANDROID_PLATFORM_NAME]
                });
            }
            const androidToolsInfoValidationErrors = this.androidToolsInfo.validateInfo();
            if (androidToolsInfoValidationErrors.length > 0) {
                result = result.concat(androidToolsInfoValidationErrors);
            }
            const javacValidationErrors = this.androidToolsInfo.validateJavacVersion(sysInfoData.javacVersion);
            if (javacValidationErrors.length > 0) {
                result = result.concat(javacValidationErrors);
            }
            if (this.hostInfo.isDarwin) {
                if (!sysInfoData.xcodeVer) {
                    result.push({
                        warning: "WARNING: Xcode is not installed or is not configured properly.",
                        additionalInformation: "You will not be able to build your projects for iOS or run them in the iOS Simulator." + os_1.EOL
                            + "To be able to build for iOS and run apps in the native emulator, verify that you have installed Xcode." + os_1.EOL,
                        platforms: [constants_1.Constants.IOS_PLATFORM_NAME]
                    });
                }
                if (!sysInfoData.xcodeprojGemLocation) {
                    result.push({
                        warning: "WARNING: xcodeproj gem is not installed or is not configured properly.",
                        additionalInformation: "You will not be able to build your projects for iOS." + os_1.EOL
                            + "To be able to build for iOS and run apps in the native emulator, verify that you have installed xcodeproj." + os_1.EOL,
                        platforms: [constants_1.Constants.IOS_PLATFORM_NAME]
                    });
                }
                if (!sysInfoData.cocoaPodsVer) {
                    result.push({
                        warning: "WARNING: CocoaPods is not installed or is not configured properly.",
                        additionalInformation: "You will not be able to build your projects for iOS if they contain plugin with CocoaPod file." + os_1.EOL
                            + "To be able to build such projects, verify that you have installed CocoaPods.",
                        platforms: [constants_1.Constants.IOS_PLATFORM_NAME]
                    });
                }
                if (sysInfoData.cocoaPodsVer && sysInfoData.isCocoaPodsUpdateRequired) {
                    result.push({
                        warning: "WARNING: CocoaPods update required.",
                        additionalInformation: `You are using CocoaPods version ${sysInfoData.cocoaPodsVer} which does not support Xcode ${sysInfoData.xcodeVer} yet.${os_1.EOL}${os_1.EOL}You can update your cocoapods by running $sudo gem install cocoapods from a terminal.${os_1.EOL}${os_1.EOL}In order for the NativeScript CLI to be able to work correctly with this setup you need to install xcproj command line tool and add it to your PATH.Xcproj can be installed with homebrew by running $ brew install xcproj from the terminal`,
                        platforms: [constants_1.Constants.IOS_PLATFORM_NAME]
                    });
                }
                if (sysInfoData.xcodeVer && sysInfoData.cocoaPodsVer) {
                    let isCocoaPodsWorkingCorrectly = yield this.sysInfo.isCocoaPodsWorkingCorrectly();
                    if (!isCocoaPodsWorkingCorrectly) {
                        result.push({
                            warning: "WARNING: There was a problem with CocoaPods",
                            additionalInformation: "Verify that CocoaPods are configured properly.",
                            platforms: [constants_1.Constants.IOS_PLATFORM_NAME]
                        });
                    }
                }
                if (sysInfoData.cocoaPodsVer && semver.valid(sysInfoData.cocoaPodsVer) && semver.lt(sysInfoData.cocoaPodsVer, Doctor.MIN_SUPPORTED_POD_VERSION)) {
                    result.push({
                        warning: `WARNING: Your current CocoaPods version is earlier than ${Doctor.MIN_SUPPORTED_POD_VERSION}.`,
                        additionalInformation: "You will not be able to build your projects for iOS if they contain plugin with CocoaPod file." + os_1.EOL
                            + `To be able to build such projects, verify that you have at least ${Doctor.MIN_SUPPORTED_POD_VERSION} version installed.`,
                        platforms: [constants_1.Constants.IOS_PLATFORM_NAME]
                    });
                }
            }
            else {
                result.push({
                    warning: "NOTE: You can develop for iOS only on Mac OS X systems.",
                    additionalInformation: "To be able to work with iOS devices and projects, you need Mac OS X Mavericks or later." + os_1.EOL,
                    platforms: [constants_1.Constants.IOS_PLATFORM_NAME]
                });
            }
            if (!sysInfoData.javaVer) {
                result.push({
                    warning: "WARNING: The Java Development Kit (JDK) is not installed or is not configured properly.",
                    additionalInformation: "You will not be able to work with the Android SDK and you might not be able" + os_1.EOL
                        + "to perform some Android-related operations. To ensure that you can develop and" + os_1.EOL
                        + "test your apps for Android, verify that you have installed the JDK as" + os_1.EOL
                        + "described in http://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html (for JDK 8)" + os_1.EOL
                        + "or http://docs.oracle.com/javase/7/docs/webnotes/install/ (for JDK 7)." + os_1.EOL,
                    platforms: [constants_1.Constants.ANDROID_PLATFORM_NAME]
                });
            }
            if (!sysInfoData.gitVer) {
                result.push({
                    warning: "WARNING: Git is not installed or not configured properly.",
                    additionalInformation: "You will not be able to create and work with Screen Builder projects." + os_1.EOL
                        + "To be able to work with Screen Builder projects, download and install Git as described" + os_1.EOL
                        + "in https://git-scm.com/downloads and add the git executable to your PATH." + os_1.EOL,
                    platforms: constants_1.Constants.SUPPORTED_PLATFORMS
                });
            }
            return result;
        });
    }
    isPlatformSupported(platform) {
        return constants_1.Constants.SUPPORTED_PLATFORMS.map(pl => pl.toLowerCase()).indexOf(platform.toLowerCase()) !== -1;
    }
    validatePlatform(platform) {
        if (!platform) {
            throw new Error("You must specify a platform.");
        }
        if (!this.isPlatformSupported(platform)) {
            throw new Error(`Platform ${platform} is not supported.The supported platforms are: ${constants_1.Constants.SUPPORTED_PLATFORMS.join(", ")} `);
        }
    }
}
Doctor.MIN_SUPPORTED_POD_VERSION = "0.38.2";
exports.Doctor = Doctor;
