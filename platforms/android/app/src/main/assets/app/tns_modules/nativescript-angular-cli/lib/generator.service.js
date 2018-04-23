"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringUtils = require("./cli-string-utils");
const path = require("path");
// const defaultPath = 'src';
const dasherizedRegExp = new RegExp('<%= dasherizedModuleName %>', 'g');
const classifiedRegExp = new RegExp('<%= classifiedModuleName %>', 'g');
const tabsRegExp = new RegExp('/\t+', 'g');
const nameRegExp = new RegExp('__name__', 'g');
class GeneratorService {
    constructor($fs, $blueprintManager) {
        this.$fs = $fs;
        this.$blueprintManager = $blueprintManager;
    }
    /**
     *
     * @param name the name of the module/component/pipe
     * @param blueprintType should match the folder structure at blueprints/
     * @param relativePath the path of where the project will be generated
     */
    generate(name, blueprintType, relativePath) {
        const classifiedName = stringUtils.classify(name);
        const dasherizedName = stringUtils.dasherize(name);
        console.log(`Prepared classifiedName: ${classifiedName} dasherizedName: ${dasherizedName}`);
        const items = this.$blueprintManager.listTemplates(blueprintType);
        this.generateFiles(items, relativePath, classifiedName, dasherizedName);
        return `${classifiedName} \`${blueprintType}\` has been created.`;
    }
    generateFiles(templates, relativePath, classifiedName, dasherizedName) {
        templates.forEach(template => {
            const fileUrl = this.parseFileUrl(relativePath, template.relativeUrl, dasherizedName);
            const templateData = this.$fs.readText(template.fullUrl);
            const data = this.parseData(templateData, classifiedName, dasherizedName);
            this.$fs.writeFile(fileUrl, data);
        });
    }
    parseData(data, classifiedName, dasherizedName) {
        return data.replace(classifiedRegExp, classifiedName).replace(dasherizedRegExp, dasherizedName)
            .replace(/\t/g, '  ');
    }
    parseFileUrl(relativePath, url, dasherizedName) {
        return path.join(relativePath, url.replace(nameRegExp, dasherizedName));
    }
}
exports.GeneratorService = GeneratorService;
$injector.register('generatorService', GeneratorService);
//# sourceMappingURL=generator.service.js.map