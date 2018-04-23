"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class GenerateServiceCommand {
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
            if (this.$validationService.checkIfServiceExists(constants_1.DefaultSrcPath.NATIVESCRIPT, args[0])) {
                this.$errors.failWithoutHelp(`${args[0]} service already exists`);
            }
            resolve(true);
        });
    }
    execute(args) {
        return new Promise((resolve, reject) => {
            let message = this.generateService(args[0]);
            this.$logger.printMarkdown(message);
            resolve();
        });
    }
    generateService(name) {
        return this.$generatorService.generate(name, 'service', constants_1.DefaultSrcPath.NATIVESCRIPT);
    }
}
$injector.registerCommand([
    'generate|service',
    'g|service',
    'generate|s',
    'g|s'
], GenerateServiceCommand);
//# sourceMappingURL=generate-service.command.js.map