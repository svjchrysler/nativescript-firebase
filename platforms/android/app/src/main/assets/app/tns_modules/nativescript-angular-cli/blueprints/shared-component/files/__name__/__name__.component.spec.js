"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
classifiedModuleName %  > Component;
from;
'./<%= dasherizedModuleName %>.component';
describe('<%= classifiedModuleName %>Component', () => {
    let component =  %  > Component;
    let fixture =  << , classifiedModuleName =  %  > Component > ;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [, classifiedModuleName %  > Component]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(, classifiedModuleName %  > Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=__name__.component.spec.js.map