import {Component, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-ux',
    templateUrl: './ux.component.html',
    styleUrls: ['./ux.component.scss']
})
export class UxComponent implements OnInit {

    page = 2;

    closeResult: string;

    sections = [];

    people = [{
        id: 1,
        name: 'Larry'
    }, {
        id: 2,
        name: 'Abba'
    }, {
        id: 3,
        name: 'Garry'
    }];
    selectedPersonId = 2;

    /* wizard */
    wizardSteps = [{
        id: 1,
        text: 'Locate your data file'
    }, {
        id: 2,
        text: 'Reference and map file'
    }, {
        id: 3,
        text: 'Start Validation'
    }];
    activeWizardStepId = 1;

    constructor(private modalService: NgbModal, private toastr: ToastrService) {
    }

    ngOnInit() {
        const sections = document.querySelectorAll('section');
        for (let i = 0; i < sections.length; i++) {
            if (sections[i]['id']) {
                this.sections.push(sections[i]['id']);
            }
        }
    }

    /*titleCase(str) {
        var splitStr = str.toLowerCase().replace().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }*/

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            console.log('Ok clicked');
        }, (reason) => {
            console.log('Dismissed');
        });
    }

    // Dropdown
    closeDropdown(el) {
        el.close();
    }


    // Toastr
    toastrSuccess() {
        this.toastr.success('Message!', 'Title', {
            closeButton: true
        });
    }

    toastrError() {
        this.toastr.error('Message!', 'Title', {
            closeButton: true
        });
    }

    toastrWarning() {
        this.toastr.warning('Message!', 'Title', {
            closeButton: true
        });
    }

    toastrInfo() {
        this.toastr.info('Message!', 'Title', {
            closeButton: true
        });
    }


    /* wizard */
    wizardStepChange($event) {
        this.activeWizardStepId = $event.data.activeStepId;
    }

}
