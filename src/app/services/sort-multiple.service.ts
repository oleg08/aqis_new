import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortMultipleService {

  constructor() { }
  dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    };
  }

  dynamicSortMultiple(properties) {
    const self = this;
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    const props = JSON.parse(JSON.stringify(properties));
    return function (obj1, obj2) {
      let i = 0, result = 0, numberOfProperties = props.length;
      /* try getting a different result from 0 (equal)
       * as long as we have extra properties to compare
       */
      while (result === 0 && i < numberOfProperties) {
        result = self.dynamicSort(props[i])(obj1, obj2);
        i++;
      }
      return result;
    };
  }
}
