import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';
import { DataFilterService } from '../shared/components/data-filters/data-filters.service';
import { ConfigService } from '../shared/services/config.service';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

    records = {};
    isLoaded = false;

    pageSize = 25;
    pageIndex = 1;

    sortByField = '';
    isDesc = false;

    filters = {};

    constructor(private dataService: DataService, public DataFilterService: DataFilterService, public configService: ConfigService) {
    }

    ngOnInit() {
        // this.loadRecords();
        this.configService.showDataFilterResults.subscribe(
            response => {
                if(response){
                    this.loadRecords();
                }
            }
        )
    }

    loadRecords() {
        this.DataFilterService.dataFilters.subscribe(response => {		
            this.filters = response;
        });	
       
        this.dataService.getAll(this.pageIndex, this.pageSize, this.sortByField, this.isDesc, this.filters).subscribe((records) => {
            this.records = records;
            this.isLoaded = true;
        });
    }

    pageChanged($event) {
        console.log($event);
        this.pageIndex = $event;
        this.loadRecords();
    }

    pageSizeChanged($event) {
        console.log($event);
        this.pageIndex = 1;
        this.pageSize = $event;
        this.loadRecords();
    }
}
