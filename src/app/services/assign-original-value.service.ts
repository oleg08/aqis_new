import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignOriginalValueService {

  constructor() { }

  handler (object, field_name) {
    if (object && field_name) {
      return object[field_name];
    } else {
      return null;
    }
  }
}
