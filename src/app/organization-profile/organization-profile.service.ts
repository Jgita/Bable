import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Organization {
    shortName: string;
    url: string;
    fileEncryptionKey: string | null;
    logoFile: string | null;
    domainAddress: string | null;
    baseDN: string | null;
    domainUserName: string | null;
    domainPassword: string | null;
    hasUsers: boolean;
    isEncryptAllDownloadedFile: boolean;
    id: string;
    userId: string;
    name: string;
    email: string;
    disabled: boolean;
    authentication: number;
    emailConfirmed: boolean;
    phoneConfirmed: boolean;
    status: number;
    adminDisabled: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class OrganizationProfileService {

    constructor(private http: HttpClient) {
    }

    get() {
        return this.http.get('assets/data/organization-profile.json');
    }

    set(data) {
        return this.http.post('assets/data/organization-profile.json', data);
    }
}
