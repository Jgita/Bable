import {Component, OnInit} from '@angular/core';
import {MapsService} from '../maps.service';
import {forkJoin} from 'rxjs';
import * as _ from 'underscore';

@Component({
    selector: 'app-edit-map',
    templateUrl: './edit-map.component.html',
    styleUrls: ['./edit-map.component.scss']
})
export class EditMapComponent implements OnInit {

    isLoading = true;

    mapData: any;

    constructor(private mapsService: MapsService) {
    }

    dumpDataToConsole(item) {
        console.log(item);
    }

    ngOnInit() {
        this.mapsService.getMappingFull().subscribe(([mapData, targetFields, pairs, metaData]) => {
            this.mapData = mapData;
            this.mapData.targetFields = targetFields;
            this.mapData.metaData = metaData;
            this.mapData.pairs = pairs;

            // hold mapped target field ids to a temp array to differentiate between what is mapped and what is not
            const mappedTargetIds = [];
            _.each(this.mapData.pairs, (pair: any) => {
                mappedTargetIds.push(pair.targetId);
                pair.targetField = _.findWhere(this.mapData.targetFields, {id: pair.targetId});
                pair.inputFields = _.filter(this.mapData.inputFields, (field: any) => {
                    return pair.inputIds.indexOf(field.id) > -1;
                });
            });

            // lets loop through all target fields and push those into pairs that are not mapped yet
            _.each(this.mapData.targetFields, (field: any) => {
                if (mappedTargetIds.indexOf(field.id) === -1) {
                    this.mapData.pairs.push({
                        inputIds: [],
                        targetId: field.id,
                        inputFields: [],
                        targetField: field
                    });
                }
            });

            // sort inputFields array
            this.mapData.inputFields = _.sortBy(this.mapData.inputFields, 'title');

            // sort pairs array
            this.mapData.pairs = _.sortBy(this.mapData.pairs, (pair: any) => {
                return pair.targetField.title;
            });

            this.isLoading = false;
        });
    }

    showMappingDetails(targetFieldId, targetTab) {

    }

    drop(event) {
        if (event.container.data.inputIds.length) {
            return false;
        }
        const inputField = event.previousContainer.data[event.previousIndex];
        event.container.data.inputIds.push(inputField.id);
        event.container.data.inputFields.push(inputField);
    }

}
