"use strict";
class HostInfo {
    constructor(winreg) {
        this.winreg = winreg;
    }
    get isWindows() {
        return process.platform === HostInfo.WIN32_NAME;
    }
    get isWindows64() {
        return this.isWindows && (this.isNode64Bit || process.env.hasOwnProperty(HostInfo.PROCESSOR_ARCHITEW6432));
    }
    get isWindows32() {
        return this.isWindows && !this.isWindows64;
    }
    get isDarwin() {
        return process.platform === HostInfo.DARWIN_OS_NAME;
    }
    get isLinux() {
        return process.platform === HostInfo.LINUX_OS_NAME;
    }
    get isNode64Bit() {
        return process.arch === "x64";
    }
    dotNetVersion() {
        if (this.isWindows) {
            return this.winreg.getRegistryValue("Version", this.winreg.registryKeys.HKLM, HostInfo.DOT_NET_REGISTRY_PATH);
        }
        else {
            return Promise.resolve(null);
        }
    }
}
HostInfo.WIN32_NAME = "win32";
HostInfo.PROCESSOR_ARCHITEW6432 = "PROCESSOR_ARCHITEW6432";
HostInfo.DARWIN_OS_NAME = "darwin";
HostInfo.LINUX_OS_NAME = "linux";
HostInfo.DOT_NET_REGISTRY_PATH = "\\Software\\Microsoft\\NET Framework Setup\\NDP\\v4\\Client";
exports.HostInfo = HostInfo;
