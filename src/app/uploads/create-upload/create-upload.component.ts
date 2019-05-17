import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-create-upload',
    templateUrl: './create-upload.component.html',
    styleUrls: ['./create-upload.component.scss']
})
export class CreateUploadComponent implements OnInit {

    wizardSteps = [{
        id: 1,
        text: 'Locate your data file'
    }, {
        id: 2,
        text: 'Reference and map file'
    }, {
        id: 3,
        text: 'Start Validation'
    }];
    activeWizardStepId = 1;

    constructor() {
    }

    ngOnInit() {
    }

    wizardStepChange($event) {
        this.activeWizardStepId = $event.data.activeStepId;
    }

    goToStep(id) {
        this.activeWizardStepId = id;
    }
}
