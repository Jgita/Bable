import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UploadSummaryService {

    constructor(private http: HttpClient) {
    }

    getSummary() {
        const lineOfBusinessId = 4;
        return this.http.get('https://medicaid.dev.babelhealth.com/api/background-jobs/data-file-processing/upload-summary/' + lineOfBusinessId);
    }
}
