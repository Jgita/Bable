import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {OrganizationProfileComponent} from './organization-profile.component';
import {OrganizationProfileService} from './organization-profile.service';

const routes: Routes = [{
    path: '',
    component: OrganizationProfileComponent
}];

@NgModule({
    declarations: [
        OrganizationProfileComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        OrganizationProfileService
    ]
})
export class OrganizationProfileModule {
}
