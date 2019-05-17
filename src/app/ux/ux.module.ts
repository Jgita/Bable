import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {UxComponent} from './ux.component';

const routes: Routes = [{
    path: '',
    component: UxComponent
}];

@NgModule({
    declarations: [UxComponent],
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class UxModule {
}
