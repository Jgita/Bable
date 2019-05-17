import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {RiskAdjustmentComponent} from './risk-adjustment.component';
import {RiskAdjustmentService} from './risk-adjustment.service';

const routes: Routes = [{
    path: '',
    component: RiskAdjustmentComponent
}];

@NgModule({
    declarations: [
        RiskAdjustmentComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        RiskAdjustmentService
    ]
})
export class RiskAdjustmentModule {
}
