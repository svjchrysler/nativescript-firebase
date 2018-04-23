"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class AndroidLocalBuildRequirements {
    constructor(androidToolsInfo, sysInfo) {
        this.androidToolsInfo = androidToolsInfo;
        this.sysInfo = sysInfo;
    }
    checkRequirements() {
        return __awaiter(this, void 0, void 0, function* () {
            const androidToolsInfo = yield this.androidToolsInfo.validateInfo();
            if (androidToolsInfo.length ||
                !(yield this.sysInfo.getJavaCompilerVersion()) ||
                !(yield this.sysInfo.getJavaVersion()) ||
                !(yield this.sysInfo.getAdbVersion())) {
                return false;
            }
            return true;
        });
    }
}
exports.AndroidLocalBuildRequirements = AndroidLocalBuildRequirements;
