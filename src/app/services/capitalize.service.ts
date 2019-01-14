import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CapitalizeService {

  constructor() { }

  capitalizeFirst (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  concatAndCapitalize (string, separator) {
    if (separator) {
      const array = string.split(separator);
      let str = '';
      array.forEach(a => {
        str += this.capitalizeFirst(a);
      });
      return str;
    }
  }
}
