"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringUtils = require("./cli-string-utils");
const path = require("path");
const constants_1 = require("./constants");
class GenerateComponentCommand {
    constructor($errors, $logger, $generatorService, $validationService) {
        this.$errors = $errors;
        this.$logger = $logger;
        this.$generatorService = $generatorService;
        this.$validationService = $validationService;
    }
    canExecute(args) {
        return new Promise((resolve, reject) => {
            if (this.$validationService.isAngularNativeScriptProject() === false) {
                this.$errors.failWithoutHelp('Angular NativeScript project not found at the current location.');
            }
            if (args.length !== 1 && args.length !== 2) {
                this.$errors.failWithoutHelp('This command requires one or two argumentsxw.');
            }
            if (args.length === 1) {
                if (this.$validationService.checkIfComponentExists(constants_1.DefaultSrcPath.NATIVESCRIPT, args[0])) {
                    this.$errors.failWithoutHelp(`${args[0]} component already exists`);
                }
            }
            else if (args.length === 2) {
                if (this.$validationService.checkIfComponentExistsInModule(constants_1.DefaultSrcPath.NATIVESCRIPT, args[0], args[1])) {
                    this.$errors.failWithoutHelp(`${args[0]} component already exists in ${args[1]} module`);
                }
            }
            resolve(true);
        });
    }
    execute(args) {
        return new Promise((resolve, reject) => {
            let message = '';
            if (args.length === 1) {
                message = this.generateComponent(args[0]);
            }
            else {
                message = this.generateComponentInModule(args[0], args[1]);
            }
            this.$logger.printMarkdown(message);
            resolve();
        });
    }
    generateComponent(name) {
        return this.$generatorService.generate(name, 'component', constants_1.DefaultSrcPath.NATIVESCRIPT);
    }
    generateComponentInModule(name, moduleName) {
        // The path should be something like src/module-name/components
        const modulePath = path.join(constants_1.DefaultSrcPath.NATIVESCRIPT, stringUtils.dasherize(moduleName));
        return this.$generatorService.generate(name, 'component', modulePath);
    }
}
$injector.registerCommand([
    'generate|component',
    'g|component',
    'generate|c',
    'g|c'
], GenerateComponentCommand);
//# sourceMappingURL=generate-component.command.js.map