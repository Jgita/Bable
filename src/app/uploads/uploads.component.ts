import {Component, OnInit} from '@angular/core';
import {UploadsService} from './uploads.service';
import {MapsService} from '../maps/maps.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'underscore';

@Component({
    selector: 'app-uploads',
    templateUrl: './uploads.component.html',
    styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {

    uploads: any;
    isLoaded = false;

    pageSize = 25;
    pageIndex = 1;

    sortByField = '';
    isDesc = true;

    filters = {
        collectionId: null,
        mapId: null,
        statusId: null
    };

    allCollections = [];
    availableMaps = [];
    statuses = [{
        id: '2',
        name: 'Rejected'
    }, {
        id: '4',
        name: 'Processing'
    }, {
        id: '7',
        name: 'Accepted (with Warning)'
    }, {
        id: '8',
        name: 'Accepted (Passed)'
    }, {
        id: '9',
        name: 'System Exception'
    }];

    constructor(
        public uploadsService: UploadsService,
        private mapsService: MapsService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.filters = {...this.filters, ...this.route.snapshot.queryParams};
        this.mapsService.getAll().subscribe((response: any) => {
            this.allCollections = response;
            this.populateAvailableMaps();
        });
        this.loadUploadList();
    }

    populateAvailableMaps() {
        this.availableMaps = [];
        if (this.filters.collectionId) {
            const selectedCollection: any = _.findWhere(this.allCollections, {id: this.filters.collectionId});
            if (selectedCollection) {
                this.availableMaps = selectedCollection.maps;
            }
        } else {
            _.each(this.allCollections, (collection: any) => {

                this.availableMaps = [...this.availableMaps, ...collection.maps];
            });
        }
    }

    loadUploadList() {
        this.uploadsService
            .getAll(this.pageIndex, this.pageSize, this.sortByField, this.isDesc, this.filters).subscribe((response: any) => {

            this.uploads = response;
            this.isLoaded = true;

        });
    }

    clearFilters() {
        this.filters.collectionId = null;
        this.filters.mapId = null;
        this.filters.statusId = null;
        this.populateAvailableMaps();
        this.onFilterChange();
    }

    onCollectionChange() {
        if (this.filters.collectionId) {
            this.filters.mapId = null;
        }
        this.populateAvailableMaps();
        this.onFilterChange();
    }

    onFilterChange() {
        const queryParams = _.pick(this.filters, _.identity);
        this.router.navigate(['/uploads'], {queryParams: queryParams});
        this.loadUploadList();
    }

    pageChanged($event) {
        console.log($event);
        this.pageIndex = $event;
        this.loadUploadList();
    }

    pageSizeChanged($event) {
        console.log($event);
        this.pageIndex = 1;
        this.pageSize = $event;
        this.loadUploadList();
    }

    toggleExpansion($event, item: any, name: string) {
        if (item.expandedName === name) {
            item.isExpanded = false;
            item.expandedName = null;
        } else {
            item.isExpanded = true;
            item.expandedName = name;
        }
    }

}
