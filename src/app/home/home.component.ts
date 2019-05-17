import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../shared/services/config.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    currentProgram = 'Medicaid';

    programs = [{
        key: 'medicare',
        value: 'Medicare'
    }, {
        key: 'medicaid',
        value: 'State Programs'
    }, {
        key: 'edge',
        value: 'EDGE'
    }, {
        key: 'apcd',
        value: 'APCD'
    }];

    constructor(public configService: ConfigService) {
    }

    ngOnInit() {
        this.currentProgram = this.configService.getActiveProgram();
    }

    changeProgram(programName) {
        // this.currentProgram = programName;
        this.configService.setActiveProgram(programName);
    }
}
