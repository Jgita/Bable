import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Organization, OrganizationProfileService} from './organization-profile.service';

@Component({
    selector: 'app-organization-profile',
    templateUrl: './organization-profile.component.html',
    styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit {

    organization: Organization;
    isLoaded = false;

    constructor(public organizationProfileService: OrganizationProfileService, public toastr: ToastrService) {
    }

    ngOnInit() {
        this.organizationProfileService.get().subscribe((response: Organization) => {
            this.organization = response;
            this.isLoaded = true;
        });
    }

    saveOrganizationProfile() {
        this.toastr.success('Organization profile has been updated successfully.');
    }

}
