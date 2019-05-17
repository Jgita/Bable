import {Component, OnInit} from '@angular/core';
import {UploadSummaryService} from './upload-summary.service';

@Component({
    selector: 'app-upload-summary',
    templateUrl: './upload-summary.component.html',
    styleUrls: ['./upload-summary.component.scss']
})
export class UploadSummaryComponent implements OnInit {

    uploadSummary: any;
    isLoaded = false;

    constructor(public uploadSummaryService: UploadSummaryService) {
    }

    ngOnInit() {
        this.uploadSummaryService.getSummary().subscribe((response: any) => {
            this.uploadSummary = response;
            this.isLoaded = true;
        });
    }

}
