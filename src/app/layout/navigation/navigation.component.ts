import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {NotificationsService} from '../../notifications/notifications.service';
import {ConfigService} from '../../shared/services/config.service';

export interface IDefaultViewDataType {
    program: string;
    subProgram: string;
    state: string;
    reportingPeriod: string;
    dos: string;
    contract: string;
}

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit {

    notificationsSummary = {
        list: [],
        unread: 0
    };

    defaultViewParams: IDefaultViewDataType;
    activeProgram = '';

    constructor(public elementRef: ElementRef, public notificationsService: NotificationsService, public configService: ConfigService) {
    }

    ngOnInit() {
        this.activeProgram = this.configService.getActiveProgram();
        this.defaultViewParams = this.configService.getDefaultViewParams();

        this.notificationsService.getSummary().subscribe((summary: any) => {
            this.notificationsSummary = summary;
        });

        this.configService.getProgramDetails().subscribe(		
            response => {		
                this.configService.ProgramsDetails.next(response);		
            });

        /*const navElement = this.elementRef.nativeElement.querySelector('#nav-default-view');
        console.log(navElement);*/
    }

    ngAfterViewInit() {
        this.resizeDefaultViewDropdown();
    }

    resizeDefaultViewDropdown() {
        const navElement = this.elementRef.nativeElement.querySelector('.nav-dropdown-full');
        const defaultViewContent = navElement.querySelector('.nav-dropdown-full-content');
        defaultViewContent.style.width = navElement.offsetParent.clientWidth + 'px';
    }

    openChange(e) {
        if (e) {
            this.resizeDefaultViewDropdown();
        }
    }

    printDefaultViewLabel() {
        const p = this.defaultViewParams;
        if (this.activeProgram === 'medicaid') {
            return `${p.reportingPeriod}`;
        } else if (this.activeProgram === 'medicare') {
            return `${p.program} / ${p.dos}`;
        }  else if (this.activeProgram === 'edge') {
            return `${p.dos}`;
        } else if (this.activeProgram === 'apcd') {
            return `${p.dos}`;
        } else {
            return `${p.program} / ${p.dos}`;
        }
    }

    defaultViewChanged(params) {
        this.defaultViewParams = JSON.parse(JSON.stringify(params));
        this.configService.setDefaultViewParams(this.defaultViewParams);
    }

}
