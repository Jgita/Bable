import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    constructor(public toastr: ToastrService, public router: Router) {
    }

    ngOnInit() {
    }

    cancelPassword() {
        this.router.navigate(['/my-profile']);
    }

    savePassword() {
        this.toastr.success('Password changed successfully');
        this.router.navigate(['/my-profile']);
    }
}
