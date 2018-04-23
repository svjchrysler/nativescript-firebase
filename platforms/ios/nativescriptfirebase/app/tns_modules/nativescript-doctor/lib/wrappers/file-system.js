"use strict";
const fs = require("fs");
const unzip_1 = require("unzip");
class FileSystem {
    exists(path) {
        return fs.existsSync(path);
    }
    extractZip(pathToZip, outputDir) {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(pathToZip).pipe(unzip_1.Extract({ path: outputDir }));
            stream.on("close", resolve);
            stream.on("error", reject);
        });
    }
    readDirectory(path) {
        return fs.readdirSync(path);
    }
}
exports.FileSystem = FileSystem;
