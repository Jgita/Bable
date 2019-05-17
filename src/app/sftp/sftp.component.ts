import {Component, OnInit} from '@angular/core';
import {SftpCredential, SftpService} from './sftp.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-sftp',
    templateUrl: './sftp.component.html',
    styleUrls: ['./sftp.component.scss']
})
export class SftpComponent implements OnInit {

    credential: SftpCredential;
    isLoaded = false;

    isPasswordVisible = false;

    constructor(public sftpService: SftpService, public toastr: ToastrService) {
    }

    ngOnInit() {
        this.sftpService.getCredentials().subscribe((response: SftpCredential) => {
            this.credential = response;
            this.isLoaded = true;
        });
    }

    resetCredentials() {
        this.toastr.success('FTP credentials reset successfully');
    }

    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
    }

    printPassword(password) {
        if (this.isPasswordVisible) {
            return password;
        } else {
            return password.replace(/./g, '*');
        }
    }

}
