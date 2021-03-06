"use strict";
const childProcess = require("child_process");
class ChildProcess {
    spawnFromEvent(command, args, event, options) {
        return new Promise((resolve, reject) => {
            options = options || {};
            const commandChildProcess = childProcess.spawn(command, args, options.spawnOptions);
            let capturedOut = "";
            let capturedErr = "";
            if (commandChildProcess.stdout) {
                commandChildProcess.stdout.on("data", (data) => {
                    capturedOut += data;
                });
            }
            if (commandChildProcess.stderr) {
                commandChildProcess.stderr.on("data", (data) => {
                    capturedErr += data;
                });
            }
            commandChildProcess.on(event, (arg) => {
                const exitCode = typeof arg === "number" ? arg : arg && arg.code;
                const result = {
                    stdout: capturedOut,
                    stderr: capturedErr,
                    exitCode: exitCode
                };
                if (options.ignoreError) {
                    resolve(result);
                }
                else {
                    if (exitCode === 0) {
                        resolve(result);
                    }
                    else {
                        let errorMessage = `Command ${command} failed with exit code ${exitCode}`;
                        if (capturedErr) {
                            errorMessage += ` Error output: \n ${capturedErr}`;
                        }
                        reject(errorMessage);
                    }
                }
            });
            commandChildProcess.once("error", (err) => {
                if (options.ignoreError) {
                    const result = {
                        stdout: capturedOut,
                        stderr: err.message,
                        exitCode: err.code
                    };
                    resolve(result);
                }
                else {
                    reject(err);
                }
            });
        });
    }
    exec(command, options) {
        return new Promise((resolve, reject) => {
            childProcess.exec(command, options, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                }
                const result = {
                    stdout,
                    stderr
                };
                resolve(result);
            });
        });
    }
    execFile(command, args) {
        return new Promise((resolve, reject) => {
            childProcess.execFile(command, args, (error, stdout) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(stdout);
                }
            });
        });
    }
}
exports.ChildProcess = ChildProcess;
