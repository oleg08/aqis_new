import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CapitalizeService {

  constructor() { }

  capitalizeFirst (string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  concatAndCapitalize (string: string, separator: string, divider?: string) {
    if (separator) {
      const array = string.split(separator);
      let str = '';
      array.forEach(a => {
        str += this.capitalizeFirst(a);
        if (divider) str += divider;
      });
      return str;
    }
  }
}
