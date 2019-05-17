import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {UploadsComponent} from './uploads.component';
import {UploadsService} from './uploads.service';
import {CreateUploadComponent} from './create-upload/create-upload.component';

const routes: Routes = [{
    path: '',
    component: UploadsComponent
}, {
    path: 'new',
    component: CreateUploadComponent
}];

@NgModule({
    declarations: [
        UploadsComponent,
        CreateUploadComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        UploadsService
    ]
})
export class UploadsModule {
}
