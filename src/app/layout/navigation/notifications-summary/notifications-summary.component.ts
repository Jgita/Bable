import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-notifications-summary',
    templateUrl: './notifications-summary.component.html',
    styleUrls: ['./notifications-summary.component.scss']
})
export class NotificationsSummaryComponent implements OnInit {

    @Input() list: Array<object>;

    constructor() {
    }

    ngOnInit() {

    }

    markAsRead(item) {

    }

    markAllAsRead(e) {

    }

    showDetail(item) {

    }

}
