import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {UserActivitiesComponent} from './user-activities.component';

const routes: Routes = [{
    path: '',
    component: UserActivitiesComponent
}];

@NgModule({
    declarations: [UserActivitiesComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class UserActivitiesModule {
}
