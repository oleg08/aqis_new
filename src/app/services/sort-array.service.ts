import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortArrayService {

  constructor() { }
  handler (array: any, field_name: string) {
    array.sort((a, b) => {
      const name1 = a[field_name].toLocaleLowerCase();
      const name2 = b[field_name].toLocaleLowerCase();
      if (name1 < name2) return -1;
      else if (name1 > name2) return 1;
      else return 0;
    });
  }
}
