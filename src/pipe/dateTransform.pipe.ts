import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dateFormat'})
export class DateFormatPipe implements PipeTransform {
    transform(value: string,format: string = "dateTime"): string {
        if (format) {
            let newString = "";
            switch (format) {
                case "dateTime":
                    newString = value.substring(11,16);
                    break;
                default:
                    break;
            }
            return newString;
        }
        return value.substring(11,16);
    }
}
