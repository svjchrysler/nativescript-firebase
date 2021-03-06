"use strict";
const Registry = require("winreg");
class WinReg {
    constructor() {
        this.registryKeys = {
            HKLM: { registry: Registry.HKLM },
            HKCU: { registry: Registry.HKCU },
            HKCR: { registry: Registry.HKCR },
            HKCC: { registry: Registry.HKCC },
            HKU: { registry: Registry.HKU }
        };
    }
    getRegistryItem(valueName, hive, key, host) {
        return new Promise((resolve, reject) => {
            const regKey = new Registry({
                hive: (hive && hive.registry) ? hive.registry : null,
                key: key,
                host: host
            });
            regKey.get(valueName, (err, value) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(value);
                }
            });
        });
    }
    getRegistryValue(valueName, hive, key, host) {
        return new Promise((resolve, reject) => {
            return this.getRegistryItem(valueName, hive, key, host)
                .then((data) => {
                resolve(data.value);
            })
                .catch(() => {
                resolve(null);
            });
        });
    }
}
exports.WinReg = WinReg;
