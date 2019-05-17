import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {NotificationsComponent} from './notifications.component';
import {NotificationsService} from './notifications.service';

const routes: Routes = [{
    path: '',
    component: NotificationsComponent
}];

@NgModule({
    declarations: [NotificationsComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        NotificationsService
    ]
})
export class NotificationsModule {
}
