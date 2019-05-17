import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {AuthLayoutComponent} from './auth-layout/auth-layout.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }, {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'home',
                loadChildren: '../home/home.module#HomeModule'
            }, {
                path: 'dashboard',
                loadChildren: '../dashboard/dashboard.module#DashboardModule'
            }, {
                path: 'data',
                loadChildren: '../data/data.module#DataModule'
            }, {
                path: 'files',
                loadChildren: '../files/files.module#FilesModule'
            }, {
                path: 'maps',
                loadChildren: '../maps/maps.module#MapsModule'
            }, {
                path: 'my-profile',
                loadChildren: '../my-profile/my-profile.module#MyProfileModule'
            }, {
                path: 'my-tasks',
                loadChildren: '../my-tasks/my-tasks.module#MyTasksModule'
            }, {
                path: 'notifications',
                loadChildren: '../notifications/notifications.module#NotificationsModule'
            }, {
                path: 'organization-profile',
                loadChildren: '../organization-profile/organization-profile.module#OrganizationProfileModule'
            }, {
                path: 'risk-adjustment',
                loadChildren: '../risk-adjustment/risk-adjustment.module#RiskAdjustmentModule'
            }, {
                path: 'sftp',
                loadChildren: '../sftp/sftp.module#SftpModule'
            }, {
                path: 'submissions',
                loadChildren: '../submissions/submissions.module#SubmissionsModule'
            }, {
                path: 'trading-partners',
                loadChildren: '../trading-partners/trading-partners.module#TradingPartnersModule'
            }, {
                path: 'unauthorized-attempts',
                loadChildren: '../unauthorized-attempts/unauthorized-attempts.module#UnauthorizedAttemptsModule'
            }, {
                path: 'uploads',
                loadChildren: '../uploads/uploads.module#UploadsModule'
            }, {
                path: 'user-activities',
                loadChildren: '../user-activities/user-activities.module#UserActivitiesModule'
            }, {
                path: 'users',
                loadChildren: '../users/users.module#UsersModule'
            }, {
                path: 'ux',
                loadChildren: '../ux/ux.module#UxModule'
            }
        ]
    }, {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                loadChildren: '../login/login.module#LoginModule'
            }, {
                path: 'logout',
                loadChildren: '../logout/logout.module#LogoutModule'
            }
        ]
    }, {
        path: '**',
        redirectTo: '/home',    // TODO: need to change to error page
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class LayoutRoutingModule {
}
