"use strict";
const child_process_1 = require("./wrappers/child-process");
const file_system_1 = require("./wrappers/file-system");
const sys_info_1 = require("./sys-info");
const host_info_1 = require("./host-info");
const android_tools_info_1 = require("./android-tools-info");
const winreg_1 = require("./winreg");
const helpers_1 = require("./helpers");
const doctor_1 = require("./doctor");
const android_local_build_requirements_1 = require("./local-build-requirements/android-local-build-requirements");
const ios_local_build_requirements_1 = require("./local-build-requirements/ios-local-build-requirements");
const constants_1 = require("./constants");
exports.constants = constants_1.Constants;
const childProcess = new child_process_1.ChildProcess();
const winReg = new winreg_1.WinReg();
const hostInfo = new host_info_1.HostInfo(winReg);
const fileSystem = new file_system_1.FileSystem();
const helpers = new helpers_1.Helpers(hostInfo);
const androidToolsInfo = new android_tools_info_1.AndroidToolsInfo(childProcess, fileSystem, hostInfo);
exports.androidToolsInfo = androidToolsInfo;
const sysInfo = new sys_info_1.SysInfo(childProcess, fileSystem, helpers, hostInfo, winReg, androidToolsInfo);
exports.sysInfo = sysInfo;
const androidLocalBuildRequirements = new android_local_build_requirements_1.AndroidLocalBuildRequirements(androidToolsInfo, sysInfo);
const iOSLocalBuildRequirements = new ios_local_build_requirements_1.IosLocalBuildRequirements(sysInfo, hostInfo);
const doctor = new doctor_1.Doctor(androidLocalBuildRequirements, helpers, hostInfo, iOSLocalBuildRequirements, sysInfo, androidToolsInfo);
exports.doctor = doctor;
const setShouldCacheSysInfo = sysInfo.setShouldCacheSysInfo.bind(sysInfo);
exports.setShouldCacheSysInfo = setShouldCacheSysInfo;
