"use strict";
class Helpers {
    constructor(hostInfo) {
        this.hostInfo = hostInfo;
    }
    getPropertyName(method) {
        if (method) {
            let match = method.toString().match(/(?:return\s+?.*\.(.+);)|(?:=>\s*?.*\.(.+)\b)/);
            if (match) {
                return (match[1] || match[2]).trim();
            }
        }
        return null;
    }
    quoteString(value) {
        if (!value) {
            return value;
        }
        return this.hostInfo.isWindows ? this.cmdQuote(value) : this.bashQuote(value);
    }
    bashQuote(s) {
        if (s[0] === "'" && s[s.length - 1] === "'") {
            return s;
        }
        return "'" + s.replace(/'/g, '\'"\'"\'') + "'";
    }
    cmdQuote(s) {
        if (s[0] === '"' && s[s.length - 1] === '"') {
            return s;
        }
        return '"' + s.replace(/"/g, '\\"') + '"';
    }
}
exports.Helpers = Helpers;
