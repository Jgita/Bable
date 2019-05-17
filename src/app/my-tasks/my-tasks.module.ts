import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MyTasksComponent} from './my-tasks.component';
import {MyTasksService} from './my-tasks.service';

const routes: Routes = [{
    path: '',
    component: MyTasksComponent
}];

@NgModule({
    declarations: [
        MyTasksComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        MyTasksService
    ]
})
export class MyTasksModule {
}
