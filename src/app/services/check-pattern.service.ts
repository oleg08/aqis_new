import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckPatternService {

  constructor() { }
  handler(pattern) {
    if (pattern) {
      return pattern;
    } else {
      return '^.*$';
    }
  }
}
