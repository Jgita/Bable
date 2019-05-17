import {Component, OnInit} from '@angular/core';
import {MyProfileService, Profile} from './my-profile.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

    profile: Profile;
    isLoaded = false;
    isEditMode = false;

    private originalProfile: Profile;

    constructor(public myProfileService: MyProfileService, public toastr: ToastrService) {
    }

    ngOnInit() {
        this.myProfileService.get().subscribe((response: Profile) => {
            this.profile = response;
            this.isLoaded = true;
        });
    }

    editProfile() {
        this.originalProfile = JSON.parse(JSON.stringify(this.profile));
        this.isEditMode = true;
    }

    saveProfile() {
        this.isEditMode = false;
        this.toastr.success('Profile updated successfully.');
    }

    cancelEdit() {
        this.profile = this.originalProfile;
        this.isEditMode = false;
    }
}
