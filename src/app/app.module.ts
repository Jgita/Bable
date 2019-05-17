import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {HomeModule} from './home/home.module';
import {LayoutModule} from './layout/layout.module';
import {AuthModule} from './auth/auth.module';
import {AuthService} from './auth/auth.service';
import {environment} from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        SharedModule,
        AuthModule,
        LayoutModule,
        HomeModule
    ],
    providers: [/*{
        provide: APP_INITIALIZER,
        useFactory: authServiceFactory,
        deps: [AuthService],
        multi: true
    }*/],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function authServiceFactory(provider: AuthService) {
    if (!environment.production) {
        const val = 'NiWgeTw4BE_K-QPmmaF3akC-uZu4OsxVQLwOFE1eautp5S-4lW3ApAox6tiBjx4Wn3nitBtfWrJAbvTra_SNEQnLrT72vb6JVLB6zPAu2K2CDoB4hpAKBA43Fyk1D6g7V-m0DqjRvIpu1hQKRPJaxPh0ics8oh_df2bNdV-gOIAQJtvt51aLAQOLdQ5DB9WoDCXzfQmwRzqFInqwSQCvx_yWn2WkqLYDZHzQ2qH99DLo5oFIJJvXTWG3GrQ3INrHSgcl1NKHA_St0lVtRNAstuL3b04KSolJQVXysRHg0_JE1XeG9xAr6KUQNn8LQr5_CJcewTKrxKnM-Ga3d5TTkRTIKvdG8KGv3edkmqG3M-fi7Ef8PBRAheJeU7rqkXHoCIQCnZOlsRJX0HGoq6Ow38qno7Dm3HqZt29nLK04NvNoXAgVMsxRz2A-x7oTMqal4I7zpWia9Iaq1RqLkqzENYhrjFsT604PaTeSfOIP3QZbEiA83wJWex_FfcPkZPjs8eRBn87Y8MSkrksVuN9Rwa-gprvzTaDZmTTjiVtROQzN0gFNr5ZOns75AyW1dKJymReRbu-Fer4tDbV5JrinMg';
        document.cookie = '.AspNet.ApplicationCookie=' + val;
    }
    return () => provider.loadConfig();
}
