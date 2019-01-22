import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsEmptyStringService {

  constructor() { }

  handler (input) {
    return (input.replace(/\s/g, '').length > 0 ? false : true);
  }
}
