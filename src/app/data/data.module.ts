import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {DataComponent} from './data.component';

const routes: Routes = [{
    path: '',
    component: DataComponent
}];

@NgModule({
    declarations: [DataComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class DataModule {
}
