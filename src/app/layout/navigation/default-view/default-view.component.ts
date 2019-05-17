import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDefaultViewDataType} from '../navigation.component';
import { Subject } from 'rxjs/internal/Subject';		
import { ConfigService } from '../../../shared/services/config.service';

@Component({
    selector: 'app-default-view',
    templateUrl: './default-view.component.html',
    styleUrls: ['./default-view.component.scss']
})
export class DefaultViewComponent implements OnInit {

    @Input() activeProgram: string;
    @Input() defaultViewParams: object;
    @Output() defaultViewChanged = new EventEmitter<object>();
    @Output() defaultViewCancelled = new EventEmitter<object>();

    params: IDefaultViewDataType;
    benefitYears: object;
    subprograms;		
    states;		
    stateSelected;

    contracts: Subject<any[]> = new Subject();
    
    constructor(private _ConfigService: ConfigService){		
    }

    ngOnInit() {
        this.params = JSON.parse(JSON.stringify(this.defaultViewParams));
        const currentYear = new Date().getFullYear(); // get the current year
        const year = new Date().getFullYear();	
        const yearList: any[] = [];
        yearList.push(year);
        for (let i = 1; i < 5; i++) {
            yearList.push(year - i);
        }

        this.benefitYears = yearList;	

        this._ConfigService.ProgramsDetails.subscribe(response => {		
                this.subprograms = response.subProgramList;		
                this.states = response.companyStateList;		
            });		
        this._ConfigService.getContracts().subscribe(response => {		
            const contractsList: any[] = [];		
            response.forEach(element => {		
                contractsList.push(element['contractId']);		
            });		
            this.contracts.next(contractsList);			
        });
    }

    save() {
        this.defaultViewChanged.emit(this.params);
    }

    cancel() {
        this.params = JSON.parse(JSON.stringify(this.defaultViewParams));
        this.defaultViewCancelled.emit();
    }

}
