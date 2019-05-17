import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

    transform(phoneNumber: any, args?: any): any {
        if (!phoneNumber || phoneNumber.length !== 10 || phoneNumber.indexOf('-') >= 0) {
            return phoneNumber;
        }

        return phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6, 4);
    }

}
