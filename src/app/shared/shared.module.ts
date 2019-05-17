import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {ConfigService} from './services/config.service';
import {UploadSummaryComponent} from './components/upload-summary/upload-summary.component';
import {UploadSummaryService} from './components/upload-summary/upload-summary.service';
import {SubmissionSummaryComponent} from './components/submission-summary/submission-summary.component';
import {SubmissionSummaryService} from './components/submission-summary/submission-summary.service';
import {PhoneNumberPipe} from './pipes/phone-number.pipe';
import {PaginationComponent} from './components/pagination/pagination.component';
import {DataFiltersComponent} from './components/data-filters/data-filters.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {HttpClientModule} from '@angular/common/http';
import {DumpDirective} from './directives/dump.directive';
import {WizardStepsComponent} from './components/wizard-steps/wizard-steps.component';

@NgModule({
    declarations: [
        UploadSummaryComponent,
        SubmissionSummaryComponent,
        PhoneNumberPipe,
        PaginationComponent,
        DataFiltersComponent,
        DumpDirective,
        WizardStepsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        RouterModule,
        NgSelectModule,
        ToastrModule.forRoot()
    ],
    exports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NgSelectModule,
        ToastrModule,
        UploadSummaryComponent,
        SubmissionSummaryComponent,
        PaginationComponent,
        DataFiltersComponent,
        PhoneNumberPipe,
        DumpDirective,
        WizardStepsComponent
    ],
    providers: [
        ConfigService,
        UploadSummaryService,
        SubmissionSummaryService
    ]
})
export class SharedModule {
}
