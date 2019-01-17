import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoveDuplicatesService {

  constructor() { }
  handler(Arr, prop) {
    return Arr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
}
