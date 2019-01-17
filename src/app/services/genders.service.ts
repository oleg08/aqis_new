import { Injectable } from '@angular/core';
import { Gender } from '../interfaces/gender';

@Injectable({
  providedIn: 'root'
})
export class GendersService {

  constructor() { }
  get () {
    const genders: Gender[] = [
      { value: 0, name: 'Not Stated' },
      { value: 1, name: 'Male' },
      { value: 2, name: 'Female' },
    ];
    return genders;
  }
}
