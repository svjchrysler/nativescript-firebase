"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class GenerateModuleCommand {
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
            if (args.length !== 1) {
                this.$errors.failWithoutHelp('This command requires one argument.');
            }
            if (this.$validationService.checkIfModuleExists(constants_1.DefaultSrcPath.NATIVESCRIPT, args[0])) {
                this.$errors.failWithoutHelp(`${args[0]} module already exists`);
            }
            resolve(true);
        });
    }
    execute(args) {
        return new Promise((resolve, reject) => {
            const message = this.generateModule(args[0]);
            this.$logger.printMarkdown(message);
            resolve();
        });
    }
    generateModule(name) {
        return this.$generatorService.generate(name, 'module', constants_1.DefaultSrcPath.NATIVESCRIPT);
    }
}
$injector.registerCommand([
    'generate|module',
    'g|module',
    'generate|m',
    'g|m'
], GenerateModuleCommand);
//# sourceMappingURL=generate-module.command.js.map