"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class GenerateSharedModuleCommand {
    constructor($errors, $logger, $generatorService, $validationService) {
        this.$errors = $errors;
        this.$logger = $logger;
        this.$generatorService = $generatorService;
        this.$validationService = $validationService;
    }
    canExecute(args) {
        return new Promise((resolve, reject) => {
            if (this.$validationService.isAngularNativeSeed() === false) {
                this.$errors.failWithoutHelp('This command should be run from the root of angular-native-seed');
            }
            if (args.length > 1) {
                this.$errors.failWithoutHelp('This command requires one argument.');
            }
            if (this.$validationService.checkIfModuleExists(constants_1.DefaultSrcPath.SHARED, args[0])) {
                this.$errors.failWithoutHelp(`${args[0]} module already exists`);
            }
            resolve(true);
        });
    }
    execute(args) {
        return new Promise((resolve, reject) => {
            const message = this.generateSharedModule(args[0]);
            this.$logger.printMarkdown(message);
            resolve();
        });
    }
    generateSharedModule(name) {
        return this.$generatorService.generate(name, 'shared-module', constants_1.DefaultSrcPath.SHARED);
    }
}
$injector.registerCommand(['generate|shared-module',
    'g|shared-module',
    'generate|sm',
    'g|sm'
], GenerateSharedModuleCommand);
//# sourceMappingURL=generate-shared-module.command.js.map