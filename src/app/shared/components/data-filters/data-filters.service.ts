import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { IContracts } from '../data-filters/data-filters.component';
import {tap} from 'rxjs/operators';
import * as _ from 'underscore';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class DataFilterService  {

    dataFilters: any = new BehaviorSubject(false);

    constructor(private http: HttpClient) {
    }

    getClaimTypes(){
        const programProductWeight: number = 512;
        const lineOfBusinessId: number = 4;
        return this.http.get<any[]>('/api/records-query/get-record-categories/' + programProductWeight + '/' + lineOfBusinessId);
    }
}
