"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const nativescript_module_1 = require("nativescript-angular/nativescript.module");
const forms_1 = require("nativescript-angular/forms");
const nativescript_angular_1 = require("nativescript-angular");
classifiedModuleName %  > Routes;
from;
'./<%= dasherizedModuleName %>.routes';
classifiedModuleName %  > Component;
from;
'./<%= dasherizedModuleName %>/<%= dasherizedModuleName %>.component';
let default_1 = class {
};
default_1 = __decorate([
    core_1.NgModule({
        imports: [
            nativescript_module_1.NativeScriptModule,
            forms_1.NativeScriptFormsModule,
            nativescript_angular_1.NativeScriptRouterModule.forChild(, classifiedModuleName %  > Routes)
        ],
        declarations: [
            , classifiedModuleName %  > Component
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], default_1);
 %  > Module;
{ }
//# sourceMappingURL=__name__.module.js.map