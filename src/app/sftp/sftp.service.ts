import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface SftpCredential {
    id: string;
    name: string;
    sftpUserName: string;
    sftpAddress: string;
    port: number;
    sftpPassword: string;
    protocol: string;
}

@Injectable({
    providedIn: 'root'
})
export class SftpService {

    constructor(private http: HttpClient) {
    }

    getCredentials() {
        return this.http.get('assets/data/ftp-credentials.json');
    }
}
