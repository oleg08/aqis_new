import { Injectable } from '@angular/core';
import { SortCustomers } from '../interfaces/sort-customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersSortDataService {
  data: SortCustomers[];

  constructor() { }

  get (super_admin) {
    this.data = [
      {label: 'Zip, Name', value: ['zip', 'name']},
      {label: 'Name',      value: 'name'},
      {label: 'Zip',       value: 'zip'}
    ];
    if (!super_admin) {
      this.data.push({label: 'State',     value: 'state'});
    }
    return this.data;
  }
}
