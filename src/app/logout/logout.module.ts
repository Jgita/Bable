import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoutComponent} from './logout.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: '',
    component: LogoutComponent
}];

@NgModule({
    declarations: [
        LogoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class LogoutModule {
}
