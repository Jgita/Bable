import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MyProfileComponent} from './my-profile.component';
import {MyProfileService} from './my-profile.service';
import {ChangePasswordComponent} from './change-password/change-password.component';

const routes: Routes = [{
    path: '',
    component: MyProfileComponent
}, {
    path: 'password',
    component: ChangePasswordComponent
}];

@NgModule({
    declarations: [
        MyProfileComponent,
        ChangePasswordComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        MyProfileService
    ]
})
export class MyProfileModule {
}
