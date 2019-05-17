import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './auth-interceptor.service';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ]
})
export class AuthModule {
}
