import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TradingPartnersService {

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get('assets/data/trading-partners.json');
    }

}
