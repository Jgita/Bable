import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: '',
    component: HomeComponent
}];

@NgModule({
    declarations: [HomeComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class HomeModule {
}
