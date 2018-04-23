"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class TemplateMetadata {
}
exports.TemplateMetadata = TemplateMetadata;
class BlueprintManager {
    constructor($fs) {
        this.$fs = $fs;
    }
    listTemplates(blueprintType) {
        const directory = this.getSourcePath(blueprintType);
        return this.findAllTemplates(directory, '');
    }
    findAllTemplates(fullPath, relativePath) {
        const items = [];
        const directoryContents = this.$fs.readDirectory(fullPath);
        directoryContents.forEach(itemName => {
            let fullItemPath = path.join(fullPath, itemName);
            let relativeItemPath = path.join(relativePath, itemName);
            if (this.isDirectory(fullItemPath)) {
                const newItems = this.findAllTemplates(fullItemPath, relativeItemPath);
                items.push(...newItems);
            }
            else {
                items.push({
                    fullUrl: fullItemPath,
                    relativeUrl: relativeItemPath
                });
            }
        });
        return items;
    }
    isDirectory(url) {
        const stat = this.$fs.getFsStats(url);
        return stat.isDirectory();
    }
    getSourcePath(blueprintType) {
        const blueprintsDir = this.getPathToBlueprints();
        return path.join(blueprintsDir, blueprintType, 'files');
    }
    getPathToBlueprints() {
        return path.join(__dirname, '..', 'blueprints');
    }
}
exports.BlueprintManager = BlueprintManager;
$injector.register('blueprintManager', BlueprintManager);
//# sourceMappingURL=blueprint-manager.js.map