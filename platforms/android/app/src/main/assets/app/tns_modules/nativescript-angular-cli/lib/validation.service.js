"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringUtils = require("./cli-string-utils");
const path = require("path");
class ValidationService {
    constructor($projectDataService, $fs) {
        this.$projectDataService = $projectDataService;
        this.$fs = $fs;
    }
    isAngularNativeScriptProject(url = '.') {
        try {
            const projectData = this.$projectDataService.getProjectData(url);
            return projectData.projectType === 'Angular';
        }
        catch (exception) {
            return false;
        }
    }
    isAngularNativeSeed(url = './nativescript') {
        try {
            const projectData = this.$projectDataService.getProjectData(url);
            return projectData.projectType === 'Angular';
        }
        catch (exception) {
            return false;
        }
    }
    checkIfComponentExists(srcPath, name) {
        const dasherizedComponentName = stringUtils.dasherize(name);
        const fullUrl = path.join(srcPath, dasherizedComponentName);
        return this.$fs.exists(fullUrl);
    }
    checkIfComponentExistsInModule(srcPath, name, moduleName) {
        const dasherizedComponentName = stringUtils.dasherize(name);
        const dasherizedModuleName = stringUtils.dasherize(moduleName);
        const fullUrl = path.join(srcPath, dasherizedModuleName, dasherizedComponentName);
        return this.$fs.exists(fullUrl);
    }
    checkIfModuleExists(srcPath, name) {
        const dasherizedModuleName = stringUtils.dasherize(name);
        const fullUrl = path.join(srcPath, dasherizedModuleName);
        return this.$fs.exists(fullUrl);
    }
    checkIfServiceExists(srcPath, name) {
        const serviceName = stringUtils.dasherize(name) + '.service.ts';
        const fullUrl = path.join(srcPath, serviceName);
        return this.$fs.exists(fullUrl);
    }
}
exports.ValidationService = ValidationService;
$injector.register('validationService', ValidationService);
//# sourceMappingURL=validation.service.js.map