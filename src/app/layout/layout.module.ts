import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {NavigationComponent} from './navigation/navigation.component';
import {GlobalSearchComponent} from './navigation/global-search/global-search.component';
import {NotificationsSummaryComponent} from './navigation/notifications-summary/notifications-summary.component';
import {DefaultViewComponent} from './navigation/default-view/default-view.component';
import {NotificationsModule} from '../notifications/notifications.module';
import {FormsModule} from '@angular/forms';
import {GlobalSearchService} from './navigation/global-search/global-search.service';
import {LayoutRoutingModule} from './layout-routing.module';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {AuthLayoutComponent} from './auth-layout/auth-layout.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    declarations: [
        NavigationComponent,
        GlobalSearchComponent,
        NotificationsSummaryComponent,
        DefaultViewComponent,
        MainLayoutComponent,
        AuthLayoutComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        RouterModule,
        LayoutRoutingModule,
        FormsModule,
        NotificationsModule,
        NgSelectModule
    ],
    exports: [],
    providers: [
        GlobalSearchService
    ]
})
export class LayoutModule {
}
