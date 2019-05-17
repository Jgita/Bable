import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {FilesComponent} from './files.component';

const routes: Routes = [{
    path: '',
    component: FilesComponent
}];

@NgModule({
    declarations: [FilesComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class FilesModule {
}
