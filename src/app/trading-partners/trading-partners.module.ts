import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {TradingPartnersComponent} from './trading-partners.component';
import {TradingPartnersService} from './trading-partners.service';
import {CreateTradingPartnerComponent} from './create-trading-partner/create-trading-partner.component';

const routes: Routes = [{
    path: '',
    component: TradingPartnersComponent
}, {
    path: 'new',
    component: CreateTradingPartnerComponent
}];

@NgModule({
    declarations: [TradingPartnersComponent, CreateTradingPartnerComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        TradingPartnersService
    ]
})
export class TradingPartnersModule {
}
