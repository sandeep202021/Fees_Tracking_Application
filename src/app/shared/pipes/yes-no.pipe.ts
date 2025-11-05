import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {

  transform(value: boolean | string | number): string {
    // handle different input types like true/false or "1"/"0"
    if (value === true || value === 'true' || value === 1 || value === '1') {
      return 'Yes';
    }
    return 'No';
  }

}
