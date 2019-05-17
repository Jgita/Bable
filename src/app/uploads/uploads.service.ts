import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import * as _ from 'underscore';

@Injectable({
    providedIn: 'root'
})
export class UploadsService {

    constructor(private http: HttpClient) {
    }

    getAll(pageIndex, pageSize, sortByField, isDesc, filters) {
        // '/api/background-jobs/data-file-processing?limit=25&offset=0&sort=uploadedAt+desc'
        const url = `/api/background-jobs/data-file-processing?limit=${pageSize}&offset=${(pageIndex - 1) * pageSize}&sort=${sortByField}+${isDesc ? 'desc' : 'asc'}`;
        return this.http.get(url);
    }

    getAllStatic(pageIndex, pageSize, sortByField, isDesc, filters) {
        return this.http.get('assets/data/upload-list.json')
            .pipe(
                tap((res: any) => {
                    // sort according to field
                    if (sortByField) {
                        res.list = _.sortBy(res.list, sortByField);
                    }
                    if (isDesc) {
                        res.list = res.list.reverse();
                    }
                    // apply pagination
                    const startIndex = (pageIndex - 1) * pageSize;
                    const endIndex = (pageIndex) * pageSize;
                    res.list = res.list.slice(startIndex, endIndex);

                    return res;
                })
            );
    }
}
