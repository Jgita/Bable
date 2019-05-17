import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-create-trading-partner',
    templateUrl: './create-trading-partner.component.html',
    styleUrls: ['./create-trading-partner.component.scss']
})
export class CreateTradingPartnerComponent implements OnInit {

    constructor(private toastr: ToastrService, private router: Router) {
    }

    ngOnInit() {
    }

    testConnection() {
        this.toastr.success('Test connection completed successfully');
    }

    save() {
        this.toastr.success('Trading partner created');
        this.router.navigate(['trading-partners']);
    }

}
