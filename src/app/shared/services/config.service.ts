import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';

declare var localStorage;

@Injectable({
    providedIn: 'root'
})

export class ConfigService {

    ProgramsDetails: any = new BehaviorSubject(false);
    showDataFilterResults: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private http: HttpClient) {
    }

    getDefaultViewParams() {
        let params: any = localStorage.getItem('defaultViewConfig');
        if (params) {
            params = JSON.parse(params);
        } else {
            params = {
                program: 'medicaid',
                subProgram: 'SNP',
                state: 'pa',
                reportingPeriod: '2019',
                dos: '2019',
                contracts: []
            };
        }
        return params;
    }

    setDefaultViewParams(params) {
        localStorage.setItem('defaultViewConfig', JSON.stringify(params));
        return params;
    }

    getContracts() {
        const lineOfBusinessId = 4;
        return this.http.get<any[]>('https://medicaid.dev.babelhealth.com/api/records-query/contracts/' + lineOfBusinessId);        
    }

  
    getProgramDetails() {
        const lineOfBusinessId: any = 4;
        const params = new HttpParams()
        .set('lineOfBusinessId', lineOfBusinessId);
        return this.http.get('https://medicaid.dev.babelhealth.com/api/programdetails/get-program-details', {params: params});
    }

    setActiveProgram(program) {
        if (program === 'medicare') {
            window.location.href = 'https://medicaid.dev.babelhealth.com';
        } else {
            if (environment.production) {
                let hostName = window.location.hostname;
                hostName = hostName.replace('apcd', '').replace('edge', '').replace('medicare', '').replace('medicaid', '');
                hostName = 'http://' + program + hostName;
                window.location.href = hostName;
            } else {
                localStorage.setItem('activeProgram', program);
                window.location.reload();
            }
        }
    }

    getActiveProgram() {
        if (environment.production) {
            const hostName = window.location.hostname;
            if (hostName.startsWith('apcd')) {
                return 'apcd';
            } else if (hostName.startsWith('edge')) {
                return 'edge';
            } else if (hostName.startsWith('medicare')) {
                return 'medicare';
            } else {
                return 'medicaid';
            }
        } else {
            return localStorage.getItem('activeProgram') || 'medicaid';
        }
    }
}
