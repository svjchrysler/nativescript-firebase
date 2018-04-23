"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringUtils = require("./cli-string-utils");
const path = require("path");
const constants_1 = require("./constants");
class GenerateSharedComponentCommand {
    constructor($errors, $logger, $generatorService, $validationService) {
        this.$errors = $errors;
        this.$logger = $logger;
        this.$generatorService = $generatorService;
        this.$validationService = $validationService;
    }
    canExecute(args) {
        return new Promise((resolve, reject) => {
            if (this.$validationService.isAngularNativeSeed() === false) {
                this.$errors.failWithoutHelp('This command should be run from the root of angular-native-seed.');
            }
            if (args.length !== 1 && args.length !== 2) {
                this.$errors.failWithoutHelp('This command requires one or two arguments argument.');
            }
            if (args.length === 1) {
                if (this.$validationService.checkIfComponentExists(constants_1.DefaultSrcPath.SHARED, args[0])) {
                    this.$errors.failWithoutHelp(`${args[0]} component already exists`);
                }
            }
            else if (args.length === 2) {
                if (this.$validationService.checkIfComponentExistsInModule(constants_1.DefaultSrcPath.SHARED, args[0], args[1])) {
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
                message = this.generateSharedComponent(args[0]);
            }
            else {
                message = this.generateSharedComponentInModule(args[0], args[1]);
            }
            this.$logger.printMarkdown(message);
            resolve();
        });
    }
    generateSharedComponent(name) {
        return this.$generatorService.generate(name, 'shared-component', constants_1.DefaultSrcPath.SHARED);
    }
    generateSharedComponentInModule(name, moduleName) {
        const modulePath = path.join(constants_1.DefaultSrcPath.SHARED, stringUtils.dasherize(moduleName));
        return this.$generatorService.generate(name, 'shared-component', modulePath);
    }
}
$injector.registerCommand([
    'generate|shared-component',
    'g|shared-component',
    'generate|sc',
    'g|sc'
], GenerateSharedComponentCommand);
//# sourceMappingURL=generate-shared-component.command.js.map