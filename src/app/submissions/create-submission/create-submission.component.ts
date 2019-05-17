import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-create-submission',
    templateUrl: './create-submission.component.html',
    styleUrls: ['./create-submission.component.scss']
})
export class CreateSubmissionComponent implements OnInit {

    wizardSteps = [{
        id: 1,
        text: 'Start Submission'
    }, {
        id: 2,
        text: 'Configure'
    }, {
        id: 3,
        text: 'Filter'
    }, {
        id: 4,
        text: 'Overview'
    }, {
        id: 5,
        text: 'Schedule'
    }];
    activeWizardStepId = 1;

    constructor() {
    }

    ngOnInit() {
    }

    wizardStepChange($event) {
        this.activeWizardStepId = $event.data.activeStepId;
    }
}
