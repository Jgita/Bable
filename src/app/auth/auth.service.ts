import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    appConfig: any;

    constructor(private http: HttpClient) {
    }

    loadConfig() {
        // call to load config
        return new Promise((resolve, reject) => {
            // TODO: load data from database instead of file.
            this.http
                .get('/api/federated/config')
                .subscribe(response => {
                    this.appConfig = response;
                    this.appConfig.allPermissions = JSON.parse(this.appConfig.allPermissions);
                    this.appConfig.userPermissions = JSON.parse(this.appConfig.userPermissions);
                    console.log(this.appConfig);
                    resolve(true);
                }, err => {
                    console.log(err);
                });
        });
    }

}
