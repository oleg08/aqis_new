import { Injectable, Pipe } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Pipe({
  name: 'filterBy'
})

export class FilterByPipeService {

  constructor() { }
  transform(value: any, input: string, searchableList: any) {
    if (input) {
      input = input.toLocaleLowerCase();
      return value.filter((el: any) => {
        let isTrue = false;
        for (const k in searchableList) {
          if (String(el[searchableList[k]]).toLocaleLowerCase().indexOf(input) > -1) {
            isTrue = true;
          }
          if (isTrue) {
            return el;
          }
        }
      });
    }
    return value;
  }
}
