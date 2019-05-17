import {Component, OnInit} from '@angular/core';
import {TradingPartnersService} from './trading-partners.service';

@Component({
    selector: 'app-trading-partners',
    templateUrl: './trading-partners.component.html',
    styleUrls: ['./trading-partners.component.scss']
})
export class TradingPartnersComponent implements OnInit {

    tradingPartners = [];

    constructor(public tradingPartnersService: TradingPartnersService) {
    }

    ngOnInit() {
        this.tradingPartnersService.getAll().subscribe((result: any) => {
            this.tradingPartners = result;
        });
    }

}
