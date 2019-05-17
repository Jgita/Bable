import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-create-collection',
    templateUrl: './create-collection.component.html',
    styleUrls: ['./create-collection.component.scss']
})
export class CreateCollectionComponent implements OnInit {

    availablePrograms = [{
        name: 'Medicaid TANF',
        fileTypes: ['TANF - IP/OP Institutional', 'TANF - IP Institutional', 'TANF - OP Institutional']
    }, {
        name: 'Medicaid LTC',
        fileTypes: ['LTC - IP/OP Institutional', 'LTC - IP Institutional', 'LTC - OP Institutional']
    }, {
        name: 'Medicaid SNP',
        fileTypes: ['SNP - IP/OP Institutional', 'SNP - IP Institutional', 'SNP - OP Institutional']
    }];

    selectedProgram = this.availablePrograms[0];

    selectedFileTypes = [];

    constructor(private toastr: ToastrService, private router: Router) {
    }

    ngOnInit() {
    }

    toggleSelectedFileType(fileType) {
        const arr = this.selectedFileTypes;
        // arr = (arr, item) => arr.includes(item) ? arr.filter(i => i !== item) : [ ...arr, item ];
        const idx = arr.indexOf(fileType);
        if (idx !== -1) {
            arr.splice(idx, 1);
        } else {
            arr.push(fileType);
        }
    }

    save() {
        this.toastr.success('Collection created successfully');
        this.router.navigate(['/maps']);
    }

}
