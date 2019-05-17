import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GlobalSearchService} from './global-search.service';

@Component({
    selector: 'app-global-search',
    templateUrl: './global-search.component.html',
    styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent implements OnInit {

    @Output() globalSearchCancelled = new EventEmitter<object>();

    searchType = 1;
    searchParams = {
        encounterId: '',
        memberId: '',
        memberLastName: '',
        memberDob: '',
        providerId: '',
        providerLastName: '',
        providerNpi: ''
    };
    searchingState = 0;
    result = {items: []};

    constructor(private globalSearchService: GlobalSearchService) {
    }

    ngOnInit() {
        this.searchingState = 0;
    }

    cancel() {
        this.globalSearchCancelled.emit();
    }

    search() {
        if (this.searchingState !== 0) {
            this.searchingState = 0;
            return;
        }
        this.searchingState = 1;
        this.globalSearchService.search(this.searchType, this.searchParams).subscribe((result: any) => {
            this.result = result;
            this.searchingState = 2;
            console.log(this.result);
        });
        return false;
    }

    searchAgain() {

    }

}
