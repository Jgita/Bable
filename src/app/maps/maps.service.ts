import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';
import * as _ from 'underscore';

@Injectable({
    providedIn: 'root'
})
export class MapsService {

    constructor(private http: HttpClient) {
    }

    getAll() {
        const lineOfBusinessId = 4;
        return this.http.get('https://medicaid.dev.babelhealth.com/api/collections/list/' + lineOfBusinessId);
    }

    getMapData() {
        return this.http.get('assets/data/map-data.json');
    }

    getMapping() {
        return this.http.get('assets/data/map-pairs.json');
    }

    getMapMetaData() {
        return this.http.get('assets/data/map-meta-data.json');
    }

    getTargetFields() {
        return this.http.get('assets/data/map-target-fields.json');
    }

    getMappingFull() {
        const mapData = this.http.get('assets/data/map-data.json');
        const targetFields = this.http.get('assets/data/map-target-fields.json');
        const pairs = this.http.get('assets/data/map-pairs.json');
        const metaData = this.http.get('assets/data/map-meta-data.json');

        return forkJoin(mapData, targetFields, pairs, metaData);
    }
}
