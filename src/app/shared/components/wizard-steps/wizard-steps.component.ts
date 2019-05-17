import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-wizard-steps',
    templateUrl: './wizard-steps.component.html',
    styleUrls: ['./wizard-steps.component.scss']
})
export class WizardStepsComponent implements OnInit {

    @Input() public steps = [];
    @Input() public activeStepId = 0;
    @Input() public allowRandomStepping = false;

    @Output() public stepChange = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    setActiveWizardStep($event, step) {
        if (this.allowRandomStepping) {
            $event.data = $event.data || {};
            $event.data.activeStepId = step.id;
            $event.data.prevStepId = this.activeStepId;

            this.activeStepId = step.id;
            this.stepChange.emit($event);
        }
    }
}
