import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {UnauthorizedAttemptsComponent} from './unauthorized-attempts.component';

const routes: Routes = [{
    path: '',
    component: UnauthorizedAttemptsComponent
}];

@NgModule({
    declarations: [UnauthorizedAttemptsComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class UnauthorizedAttemptsModule {
}
