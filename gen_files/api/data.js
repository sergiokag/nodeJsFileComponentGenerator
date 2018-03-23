const _args = require('../boilerplate/index');
const _strgArr = [_args].map( i => ''+i+'' );
let _title = _args[2];

module.exports = [ 
    {   
        subFolder: 'css',
        fileType: 'style.css',
        fileContent: '',
    }, 
    {   
        subFolder: 'html',
        fileType: 'template.html',
        fileContent: '',
    }, 
    {   
        subFolder: 'js',
        fileType: 'component.ts',
        fileContent: `//Core Angular
        import { Component, Inject, ElementRef, ViewChild, ViewChildren, QueryList, Renderer, NgZone, ViewEncapsulation } from "@angular/core";
        import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from "@angular/forms";
        import { Subscription } from "rxjs";
        
        //Helpers
        import { DynamicComponentNavigationClient } from '../../../../../helpers/dynamicComponentNavigationClient.class';
        
        //Services
        import { ApplicationResourcesService } from '../../../../../services/dataRepository/applicationResources.service';
        import { DialogManagerService, DialogConfirmButtons, PrintDialogData } from "../../../../../services/applicationHelpers/dialogManager.service";
        import { ApplicationInformationService, DefaultCodeTableItem } from "../../../../../services/dataRepository/applicationInformation.service";
        
        //Resources
        import { ${_title}ResourcePipe } from './${_title}.resources';
        
        //referenceData
        import { CodeTableItem } from '../../../../../contracts/apiContracts/common/contracts/getReferenceDataResponsePackage';
        import { CodeTableDecoderPipe } from "../../../../shared/pipes/codeTableDecoder.pipe";
        
        // EXAMPLE: import { AdviceOrderType } from "../../../../../referencedata/AdviceOrderType";
        // %%tableImports%%
        @Component({
            selector: '${_title}',
            templateUrl: "../html/.template.html",
            styleUrls: ["../../../../../../app/css/teller-override.css", "../css/${_title}.style.css"],
            encapsulation: ViewEncapsulation.None
        })
        export class ${_title}Component extends DynamicComponentNavigationClient {
        
            resources: ${_title}ResourcePipe;
            form: FormGroup;
        
            constructor(
                @Inject(NgZone) private zone: NgZone,
                @Inject(FormBuilder) private formBuilder: FormBuilder,
                @Inject(ElementRef) element: ElementRef,
                @Inject(ApplicationResourcesService) applicationResources: ApplicationResourcesService,
                @Inject(DialogManagerService) private dialogManager: DialogManagerService,
                @Inject(ApplicationInformationService) private applicationInformation: ApplicationInformationService,
                private fb: FormBuilder,
                private codeTableDecoderPipe: CodeTableDecoderPipe
            ) {
        
                super(element);
                this.resources = new ${_title}ResourcePipe(applicationResources);
                this.dcnSetComponentTitle(this.resources.transform('pageTitle'));
            }
            
            ngOnInit() {
                this.form = this.fb.group({ });
                this.populateCodeTables();
            }
            
            populateCodeTables() {
                let codeTableNames = '${[_strgArr]}'.split(',');
                let businessCaseId = this.dcnGetTabBusinessCaseId();
                this.applicationInformation.getCodeTables(codeTableNames, businessCaseId, false, 1)
                    .then(result => {
                        this.zone.run(() => {
                            if (result && result.length > 0) {
                                codeTableNames.forEach(codeTableName => {
                                    let table = result.filter(codeTable => codeTable.Name === codeTableName);
                                    if (table && table.length > 0) {
                                        this['codeTable' + codeTableName] = table[0].TableItems;
                                    }
                                });
                            }
                            this.prepareFormAndSettings();
                        });
                    })
                    .catch(exception => { });
            }
            }`,
    },
    {   
        subFolder: 'resources',
        fileType: 'resources.el.ts',
        fileContent: '',
    },
    {   
        subFolder: 'resources',
        fileType: 'resources.en.ts',
        fileContent: '',
    },                    

];