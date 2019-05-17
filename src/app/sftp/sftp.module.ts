import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {SftpComponent} from './sftp.component';
import {SftpService} from './sftp.service';

const routes: Routes = [{
    path: '',
    component: SftpComponent
}];

@NgModule({
    declarations: [
        SftpComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        SftpService
    ]
})
export class SftpModule {
}
