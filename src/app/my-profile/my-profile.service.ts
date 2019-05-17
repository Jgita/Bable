import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Profile {
    id: string;
    name: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    userGroupId: number;
    defaultLob: string;
    turnOffEmailNotification: object;
    roles: object;
}

@Injectable({
    providedIn: 'root'
})
export class MyProfileService {

    constructor(private http: HttpClient) {
    }

    get() {
        return this.http.get('assets/data/my-profile.json');
    }
}
