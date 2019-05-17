import {Directive, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[appDump]'
})
export class DumpDirective {

    @Input() appDump: any;

    constructor() {
    }

    @HostListener('click', ['$event']) onClick($event) {
        console.log(this.appDump);
    }
}
