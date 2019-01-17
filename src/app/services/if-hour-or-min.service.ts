import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IfHourOrMinService {

  constructor() { }
  handler (field_name) {
    const time_field = field_name.split('_');
    const hours_min = time_field[time_field.length - 1];
    if (hours_min === 'hours' || hours_min === 'min') {
      return time_field[0] + '_time';
    } else {
      return field_name;
    }
  }
}
