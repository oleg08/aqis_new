import { Injectable } from '@angular/core';
import { TimeZones } from '../interfaces/time-zones';
import { HalfTimeZones } from '../interfaces/half-time-zones';

@Injectable({
  providedIn: 'root'
})
export class TimeZonesDataService {

  zones: TimeZones[];
  half_zones: HalfTimeZones[];

  constructor () {}

  getZone() {
    this.zones = [
      {id: 1, value: null, name: 'Default'},
      {id: 2, value: -12, name: 'GMT -12'},
      {id: 3, value: -11, name: 'GMT -11'},
      {id: 4, value: -10, name: 'GMT -10'},
      {id: 5, value: -9, name: 'GMT -09'},
      {id: 6, value: -8, name: 'GMT -08'},
      {id: 7, value: -7, name: 'GMT -07'},
      {id: 8, value: -6, name: 'GMT -06'},
      {id: 9, value: -5, name: 'GMT -05'},
      {id: 10, value: -4, name: 'GMT -04'},
      {id: 11, value: -3, name: 'GMT -03'},
      {id: 12, value: -2, name: 'GMT -02'},
      {id: 13, value: -1, name: 'GMT -01'},
      {id: 14, value: 0, name: 'GMT 00'},
      {id: 15, value: 1, name: 'GMT 01'},
      {id: 16, value: 2, name: 'GMT 02'},
      {id: 17, value: 3, name: 'GMT 03'},
      {id: 18, value: 4, name: 'GMT 04'},
      {id: 19, value: 5, name: 'GMT 05'},
      {id: 20, value: 6, name: 'GMT 06'},
      {id: 21, value: 7, name: 'GMT 07'},
      {id: 22, value: 8, name: 'GMT 08'},
      {id: 23, value: 9, name: 'GMT 09'},
      {id: 24, value: 10, name: 'GMT 10'},
      {id: 25, value: 11, name: 'GMT 11'},
      {id: 26, value: 12, name: 'GMT 12'},
    ];
    return this.zones;
  }

  getHalfZone () {
    this.half_zones = [
      {id: 1, value: false, name: '00 minutes'},
      {id: 2, value: true, name: '30 minutes'},
    ];
    return this.half_zones;
  }
}
