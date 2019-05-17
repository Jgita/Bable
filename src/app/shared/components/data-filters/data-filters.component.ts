import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from '../../services/config.service';
import {FormGroup} from '@angular/forms/src/model';
import {DataFilterService} from './data-filters.service';
import { NgForm } from '@angular/forms';

export interface IContracts {
    Id: number;
    status: boolean;
}

export interface IClaimStatuses {
    claimStatusId: number;
    status: boolean;
}
export interface IClaimTypes {
    shortName: string;
    ClaimTypeStatus: boolean;
}

export interface IFilter {
    ClaimStatus?: any;
    contractDetails: any;
    claimDetails: any;
    claimStatusDetails: any;
    idNameOptionValue: any;
    SearchTextPlaceholder: any;
    claimStates: any;
    fillDateFrom: any;
    fillDateTo: any;
    dateOfServiceFrom?: any;
    dateOfServiceTo?: any;
    dateOfSubmissionFrom?: any;
    dateOfSubmissionTo?: any;
    dateOfUploadFrom?: any;
    dateOfUploadTo?: any;
}

export interface IOptions {
    text: any;
    value: any;
}

export interface IVoidReplaceOptionsItems {
    text: any;
    value: any;
    status: boolean;
}


@Component({selector: 'app-data-filters', templateUrl: './data-filters.component.html', styleUrls: ['./data-filters.component.scss']})
export class DataFiltersComponent implements OnInit {

    selectedContracts: IContracts[] = [];
    selectedClaimStatuses: IClaimStatuses[] = [];
    selectedClaimTypes: IClaimTypes[] = [];
    selectedVoidReplaceOptions: IVoidReplaceOptionsItems [] = [];
    findByDatesOptions: any;
    idNameOptionValue: string;
    selectedOptionName: string;
    claimTypesRes: any;

    /**
     * used model name to set default date
     */
    FromDateOfService: any;
    ToDateOfService: any;

    /**
     * used to store the placeholder for search textbox
     */
    SearchTextPlaceholder: string;

    /**
     * used to store the value of searchByViewData
     */
    SearchTextPlaceholderValue: string;

    /**
     * Used to store status of SearchByDateForm.
     */
    FillDateFormVisible = false;
    DateOfServiceFormVisible = false;
    DateOfUploadFormVisible = false;
    DateOfSubmissionFormVisible = false;

    /**
     * Used to watch on filter form controls.
     */
    @ViewChild('f') FilterForm: NgForm;

    /**
     * Used to store filter form values
     */
    FilterFormValue: IFilter;


    /**
     * used to store dynamic date value filter list
     */

     dynamicDateFilterList = [
            'fillDateFrom',
            'fillDateTo',
            'dateOfServiceFrom',
            'dateOfServiceTo',
            'dateOfSubmissionFrom',
            'dateOfSubmissionTo',
            'dateOfUploadFrom',
            'dateOfUploadTo'
     ];


    filters = {
        program: 1,
        claimType: 1
    };
    contracts = [
        {
            contractId: '',
            programWeights: [],
            contractName: '',
            contractType: ''
        }
    ];

    claimTypes = [
        'Institutional',
        'Professional',
        'DME',
        'Transportation',
        'Vision',
        'Dental',
        'Behavioral Health',
        'LTSS'
    ];

    statuses = [
        {
            key: 0,
            value: 'Never Submitted'
        }, {
            key: 1,
            value: 'Accepted'
        }, {
            key: 2,
            value: 'Awaiting Re-submission'
        }, {
            key: 3,
            value: 'Schedule for Submission'
        }, {
            key: 4,
            value: 'Rejected'
        }, {
            key: 5,
            value: 'Awaiting Response'
        }, {
            key: 7,
            value: 'Duplicate'
        }, {
            key: 12,
            value: 'Pending for Approval'
        }, {
            key: 14,
            value: 'Pending for Conversion'
        }, {
            key: 15,
            value: 'Pending'
        }, {
            key: 18,
            value: 'Pending for Reversal'
        }, {
            key: 19,
            value: 'Reversed'
        }, {
            key: 36,
            value: 'Unrepairable'
        }
    ];

    searchByViewData: IOptions[] = [
        {
            text: 'Please select',
            value: 'optional'
        },
        {
            text: 'Encounter ID',
            value: 'claimId'
        }, {
            text: 'Member Last Name',
            value: 'memberName'
        }, {
            text: 'Member ID',
            value: 'memberId'
        }, {
            text: 'Provider Last Name',
            value: 'providerName'
        }, {
            text: 'Provider NPI',
            value: 'providerId'
        }
    ];

    dateOptionsItems = [
        {
            entityType: 2,
            options: [
                {
                    text: 'Please select',
                    value: 'optional',
                },
                {
                    text: 'Fill Date',
                    value: 'fillDate'
                }, {
                    text: 'Service Date',
                    value: 'dateOfService'
                }, {
                    text: 'Date Uploaded',
                    value: 'dateOfUpload'
                }, {
                    text: 'Date of Submission',
                    value: 'dateOfSubmission'
                }
            ]
        }
    ];

    voidReplaceOptionsItems = [
        {
            entityType: 2, // Claims
            options: [
                {
                    text: 'Replacement',
                    value: 1
                }, {
                    text: 'Void',
                    value: 2
                }
            ]
        }
    ];

    constructor(public configService: ConfigService, public dataFilterService: DataFilterService) {
    }

    ngOnInit() {
        this
            .configService
            .getContracts()
            .subscribe((response: any) => {
                this.contracts = response;
            });

          this.dataFilterService.getClaimTypes().subscribe((response: any) => {
              const recordTypes = response[0].entityTypes[0].recordCategories[0].recordTypes;
              const baseSegmentType = response[0].entityTypes[0].recordCategories[0];
              this.claimTypesRes = recordTypes;
            });

            this.FilterForm.form.valueChanges.subscribe(values => {
                this.FilterFormValue = values;
            });

            /**
             * used to select default date of service
             */
            const serviceDateObject = {
                text: 'Service Date',
                value: 'dateOfService'
            };

            this.DateOfServiceFormVisible = true;
            this.dateOptionsItems[0].options.splice(2, 1);
            /**
             * end
             */

            this.FromDateOfService = {
                'year': 2018,
                'month': 1,
                'day': 1
            };
            this.ToDateOfService = {
                'year': 2018,
                'month': 12,
                'day': 31
            };

    }

    onChangeContracts(event: boolean, item) {
        const index = this
            .selectedContracts
            .findIndex((element: any) => element.Id === item.contractId);
        if (index !== -1) {
            this.selectedContracts[index] = {
                Id: item.contractId,
                status: event
            };

        } else {
            const selectedContract: IContracts = {
                Id: item.contractId,
                status: event
            };
            this
                .selectedContracts
                .push(selectedContract);
        }
        this.selectedContracts = this
            .selectedContracts
            .filter(element => element.status);
    }

    onChangeClaimType(event: boolean, item) {
        const index = this
            .selectedClaimTypes
            .findIndex((element: any) => element.shortName === item.shortName);
        if (index !== -1) {
            this.selectedClaimTypes[index] = {
                shortName: item.shortName,
                ClaimTypeStatus: event
            };
        } else {
            const selectedClaimType: IClaimTypes = {
                shortName: item.shortName,
                ClaimTypeStatus: event
            };
            this
                .selectedClaimTypes
                .push(selectedClaimType);
        }

        this.selectedClaimTypes = this
            .selectedClaimTypes
            .filter(element => element.ClaimTypeStatus);
    }

    onChangeClaimStatus(event: boolean, item) {
        const index = this
            .selectedClaimStatuses
            .findIndex((element: any) => element.claimStatusId === item.key);
        if (index !== -1) {
            this.selectedClaimStatuses[index] = {
                claimStatusId: item.key,
                status: event
            };
        } else {
            const selectedClaimStatus: IClaimStatuses = {
                claimStatusId: item.key,
                status: event
            };
            this
                .selectedClaimStatuses
                .push(selectedClaimStatus);
        }
        this.selectedClaimStatuses = this
            .selectedClaimStatuses
            .filter(element => element.status);
    }

     /**
     * used to check which value selcted for VoidReplaceClaims
     * @param event used to check status of VoidReplaceClaims
     * @param item used to check value of VoidReplaceClaims
     */

    onChangeVoidReplaceClaim(event: boolean, item) {
        const index = this.selectedVoidReplaceOptions.findIndex((element: any) => element.value === item.value);
        if (index !== -1) {
            this.selectedVoidReplaceOptions[index] = {
                value: item.value,
                text: item.text,
                status: event
            };
        } else {
                const selectedVoidReplaceOption = {
                    value: item.value,
                    text: item.text,
                    status: event
                };
                this.selectedVoidReplaceOptions.push(selectedVoidReplaceOption);
            }
            this.selectedVoidReplaceOptions = this.selectedVoidReplaceOptions.filter((element) => element.status);
            console.log('this.selectedVoidReplaceOptions', this.selectedVoidReplaceOptions);
    }

      /**
     * used to get date in mm/dd/yyyy format
     */

    getDate(date): string {
        return date.month + '/' + date.day + '/' + date.year;
    }

    onSubmitedForm(formData: FormGroup) {
      const controlList = Object.keys(this.FilterFormValue);
      this.dynamicDateFilterList.forEach(dateFilterName => {
          const index = controlList.findIndex(control => control === dateFilterName);
          if (index !== -1) {
              this.FilterFormValue[dateFilterName] = this.getDate(this.FilterFormValue[dateFilterName]);
          }
      });
       this.FilterFormValue.contractDetails = this.selectedContracts;
       this.FilterFormValue.claimDetails = this.selectedClaimTypes;
       this.FilterFormValue.claimStatusDetails = this.selectedClaimStatuses;
       this.FilterFormValue.contractDetails = this.selectedContracts;
       this.FilterFormValue.claimStates = this.selectedVoidReplaceOptions;
       this.FilterFormValue.SearchTextPlaceholder = this.SearchTextPlaceholderValue;
       this.FilterFormValue.idNameOptionValue = this.idNameOptionValue;
       this
          .dataFilterService
          .dataFilters
          .next(this.FilterFormValue);
       this
          .configService
          .showDataFilterResults
          .next(true);
  }


    /**
     * used to get the selected filter
     * @param event used to store search filter data
     */
    searchViewDataChange(event) {
        this.SearchTextPlaceholder = event.target.selectedOptions[0].label;
        this.SearchTextPlaceholderValue = event.target.value;
    }

    FilterOptionChange(eventData) {
        this.selectedOptionName = eventData.target.selectedOptions[0].label;
        this.dateOptionsItems[0].options = this.dateOptionsItems[0].options.filter(element => element.text !== this.selectedOptionName);

        if (this.selectedOptionName === 'Fill Date') {
            this.FillDateFormVisible = true;
        } else if (this.selectedOptionName === 'Service Date') {
            this.DateOfServiceFormVisible = true;
        } else if (this.selectedOptionName === 'Date Uploaded') {
            this.DateOfUploadFormVisible = true;
        } else if (this.selectedOptionName === 'Date of Submission') {
            this.DateOfSubmissionFormVisible = true;
        }

    }

    /**
     * Used to add date filter option in filter by array
     * @param text used to store label.
     * @param value used to store value.
     */
    RemoveFilterByDate(text: string, value: string) {
        const optionObject = {
            text: text,
            value: value
        };
        if (text === 'Fill Date') {
            this.dateOptionsItems[0].options.splice(1, 0, optionObject);
            this.FillDateFormVisible = !this.FillDateFormVisible;
        } else if (text === 'Service Date') {
            this.dateOptionsItems[0].options.splice(2, 0, optionObject);
            this.DateOfServiceFormVisible = !this.DateOfServiceFormVisible;
        } else if (text === 'Date Uploaded') {
            this.dateOptionsItems[0].options.splice(3, 0, optionObject);
            this.DateOfUploadFormVisible = ! this.DateOfUploadFormVisible;
        } else if (text === 'Date of Submission') {
            this.dateOptionsItems[0].options.splice(4, 0, optionObject);
            this.DateOfSubmissionFormVisible = !this.DateOfSubmissionFormVisible;
        }
    }

getActiveProgram() {
       const defaultparams =  localStorage.getItem('defaultViewConfig');
       return defaultparams['state'];
   }
}
