import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DifferenceArraysService {

  constructor() { }

  // Find values that are in arr1 but not in arr2
  uniqueInArray1 (arr1, arr2, val) {
    const uniqueResult = arr1.filter(obj => {
      return !arr2.some(obj2 => {
        return obj[val] === obj2[val];
      });
    });
    return uniqueResult;
  }
}
