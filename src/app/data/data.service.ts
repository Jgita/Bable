import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import * as _ from 'underscore';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    possibleCounts = [0, 0, 1, 2, 3, 4, 5, 6, 7];

    filterClaimStatus = {
        NeverSubmitted: 0,
        Accepted: 1,
        AwaitingReSubmission: 2,
        ScheduleForSubmission: 3,
        Rejected: 4,
        AwaitingResponse: 5,
        PartiallyAccepted: 6,
        Duplicate: 7,
        PendingForApproval: 12,
        Approved: 13,
        PendingForConversion: 14,
        Pending: 15,
        AwaitingConversion: 16,
        NeverSubmittedFromUpload: 17,
        PendingForReversal: 18,
        Reversed: 19,
        Submitted: 35,
        Unrepairable: 36
};

    claimReplacementOrVoidStatus = {
        None: 0,
        Replacement: 1,
        Void: 2,
        Voided: 3,
        Replaced: 4
    };


    constructor(private http: HttpClient) {
    }

    getRecords() {
        return this.http.get('assets/data/records.json');
    }

    getAll(pageIndex, pageSize, sortByField, isDesc, filters) {
        let ContractIds: any;
        let claimDetails: any;
        let claimStatusDetails: any;
        let ClaimStates: any;
        const baseSegmentType: any = 6;
        const entityType: any = 2;
        const programProductKey = 'edps'; // 'medicaidPA';
        const programProductWeight: any = 64; // 512;
        const recordCategoryId: any = 1;
        const executionTimeLimit: any = 90;
        const lineOfBusinessId: any = 4;

        ContractIds = filters.contractDetails.map(Contract => Contract.Id);
        claimDetails = filters.claimDetails.map(item => item.shortName);
        claimStatusDetails = filters.claimStatusDetails.map(item => item.claimStatusId);
        ClaimStates = filters.claimStates.map(item => item.value);

           let params = new HttpParams();
           Object.keys(claimDetails).forEach(function (key) {
            params = params.append('RecordTypes', claimDetails[key]);
           });
           Object.keys(ContractIds).forEach(function (key) {
            params = params.append('ContractIds', ContractIds[key]);
           });
           Object.keys(claimStatusDetails).forEach(function (key) {
            params = params.append('ClaimStatuses', claimStatusDetails[key]);
           });
           Object.keys(ClaimStates).forEach(function (key) {
            params = params.append('ClaimStates', ClaimStates[key]);
           });

           const searchTextPlaceholder = filters.SearchTextPlaceholder;

            if (filters.fillDateTo) {
                params = params.append('fillDateTo', filters.fillDateTo);
            }
            if (filters.fillDateFrom) {
                params = params.append('fillDateFrom', filters.fillDateFrom);
            }
            if (filters.dateOfServiceFrom) {
                params = params.append('dateOfServiceFrom', filters.dateOfServiceFrom);
            }
            if (filters.dateOfServiceTo) {
                params = params.append('dateOfServiceTo', filters.dateOfServiceTo);
            }
            if (filters.dateOfSubmissionFrom) {
                params = params.append('dateOfSubmissionFrom', filters.dateOfSubmissionFrom);
            }
            if (filters.dateOfSubmissionTo) {
                params = params.append('dateOfSubmissionTo', filters.dateOfSubmissionTo);
            }
            if (filters.dateOfUploadFrom) {
                params = params.append('dateOfUploadFrom', filters.dateOfUploadFrom);
            }

           params = params.set('BaseSegmentType', baseSegmentType);
           params = params.set('EntityType', entityType);
           params = params.set('ProgramProductWeight', programProductWeight);
           params = params.set('RecordCategoryId', recordCategoryId);
           params = params.set('ExecutionTimeLimit', executionTimeLimit);
           params = params.set('ExecutionTimeLimit', executionTimeLimit);
           params = params.set(searchTextPlaceholder, filters.idNameOptionValue);

           return this.http.get('/api/records-query', {params: params})

            .pipe(
                tap((res: any) => {
                    let recordStatusTooltipText = '';
                    // sort according to field
                    if (sortByField) {
                        res.list = _.sortBy(res.list, sortByField);
                    }
                    if (isDesc) {
                        res.list = res.list.reverse();
                    }
                    // apply pagination
                    const startIndex = (pageIndex - 1) * pageSize;
                    const endIndex = (pageIndex) * pageSize;
                    res.list = res.list.slice(startIndex, endIndex);

                    _.each(res.list, (recordItem: any) => {
                        _.each(recordItem.recordStatus, (item: any) => {
                        let recordStatusText = '';
                        if (recordItem.viewStatus === this.filterClaimStatus.Unrepairable) {
                            recordStatusText = 'Unrepairable';
                        } else if (item.replacementOrVoidStatus === this.claimReplacementOrVoidStatus.Replaced) {
                            recordStatusText = 'Replaced';
                        } else if (item.replacementOrVoidStatus === this.claimReplacementOrVoidStatus.Voided) {
                            recordStatusText = 'Voided';
                        } else if (recordItem.viewStatus === this.filterClaimStatus.Duplicate) {
                            recordStatusText = 'Duplicate';
                        } else if (item.isInBatch && recordItem.viewStatus === this.filterClaimStatus.Rejected) {
                            recordStatusText = 'In Batch';
                        } else if (item.isInBatch &&  recordItem.viewStatus === this.filterClaimStatus.ScheduleForSubmission) {
                            recordStatusText = 'Schedule for Submission (In Batch)';
                        } else if (recordItem.viewStatus === this.filterClaimStatus.Accepted) {
                            recordStatusText = 'Accepted';
                        } else if (recordItem.viewStatus === this.filterClaimStatus.Rejected) {
                            recordStatusText = item.customResponseStatusText;
                        } else if (recordItem.viewStatus === this.filterClaimStatus.AwaitingReSubmission) {
                            recordStatusText = 'Awaiting Re-Submission';
                        } else if (recordItem.viewStatus === this.filterClaimStatus.ScheduleForSubmission) {
                            recordStatusText = 'Schedule for Submission';
                        } else if (recordItem.viewStatus === this.filterClaimStatus.AwaitingResponse) {
                            recordStatusText = 'Awaiting Response';
                        } else if (recordItem.viewStatus === this.filterClaimStatus.PartiallyAccepted) {
                            recordStatusText = '<i>Accepted*<i/>';
                        } else if (recordItem.viewStatus === this.filterClaimStatus.PendingForApproval) {
                            recordStatusText = 'Pending for Approval';
                        } else if (recordItem.viewStatus === this.filterClaimStatus.PendingForConversion) {
                            recordStatusText = 'Pending for Conversion';
                        } else if (recordItem.viewStatus === this.filterClaimStatus.Pending) {
                            recordStatusText = 'Pending';
                        } else if (recordItem.viewStatus === this.filterClaimStatus.NeverSubmitted ||
                            recordItem.viewStatus === this.filterClaimStatus.NeverSubmittedFromUpload) {
                            recordStatusText = 'Never Submitted';
                        } else if (recordItem.viewStatus === this.filterClaimStatus.Submitted) {
                            recordStatusText = 'Submitted';
                        } else if (recordItem.viewStatus === this.filterClaimStatus.PendingForReversal) {
                            recordStatusText = 'Pending for Reversal';
                        } else if (recordItem.viewStatus === this.filterClaimStatus.Reversed) {
                            recordStatusText = 'Reversed';
                        }
                        // else if (item.viewStatus === this.filterClaimStatus.PendingForAdjustment) {
                        //     recordStatusText = "Pending For Adjustment";
                        // }
                        if (item.replacementOrVoidStatus === this.claimReplacementOrVoidStatus.Void) {
                            recordStatusText = recordStatusText + '<br/> (Void)';
                        }
                        item.recordStatusText =  recordStatusText;
                            if (item.isPartiallyAccepted) {
                                recordStatusTooltipText = 'The header has been accepted, but one or more service lines has been rejected. Review the rejected service lines, void the encounter, and re-submit the corrected encounter.';
                            }
                         item.recordStatusTooltipText = recordStatusTooltipText;
                    });
                    });
                    return res;
                })
            );
    }
}
