import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SubmissionSummaryService {

    constructor(private http: HttpClient) {
    }

    getSummary() {
        return this.http.get('assets/data/submission-summary.json');
    }
}
