import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {SubmissionsComponent} from './submissions.component';
import {CreateSubmissionComponent} from './create-submission/create-submission.component';
import {SubmissionsService} from './submissions.service';

const routes: Routes = [{
    path: '',
    component: SubmissionsComponent
}, {
    path: 'new',
    component: CreateSubmissionComponent

}];

@NgModule({
    declarations: [
        SubmissionsComponent,
        CreateSubmissionComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        SubmissionsService
    ]
})
export class SubmissionsModule {
}
