import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GlobalSearchService {

    constructor(private http: HttpClient) {
    }

    search(searchType, searchParams) {
        return this.http.get('assets/data/global-search.json');
    }
}
