import {Component, OnInit} from '@angular/core';
import {SubmissionSummaryService} from './submission-summary.service';

@Component({
    selector: 'app-submission-summary',
    templateUrl: './submission-summary.component.html',
    styleUrls: ['./submission-summary.component.scss']
})
export class SubmissionSummaryComponent implements OnInit {

    submissionSummary: any;
    isLoaded = false;

    constructor(public submissionSummaryService: SubmissionSummaryService) {
    }

    ngOnInit() {
        this.submissionSummaryService.getSummary().subscribe((response: any) => {
            this.submissionSummary = response;
            this.isLoaded = true;
        });
    }

}
