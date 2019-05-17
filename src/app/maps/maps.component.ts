import {Component, OnInit} from '@angular/core';
import {MapsService} from './maps.service';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

    collections = [];

    constructor(private mapsService: MapsService) {
    }

    ngOnInit() {
        this.mapsService.getAll().subscribe((response: any) => {
            this.collections = response;
        });
    }

}
