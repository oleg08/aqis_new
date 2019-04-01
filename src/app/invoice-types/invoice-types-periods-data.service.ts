import { Injectable } from '@angular/core';
import {InvoicePeriod} from './new-invoice-type/new-invoice-type.component';

@Injectable({
  providedIn: 'root'
})
export class InvoiceTypesPeriodsDataService {

  constructor() { }

  getPeriods () {
    const periods: InvoicePeriod[] = [
      {id: 0, label: 'Two Weeks'},
      {id: 1, label: 'One Month'}
    ];
    return periods;
  }

  getDiscountSigns () {
    const doscount_signs: InvoicePeriod[] = [
      {id: 0, label: '%'},
      {id: 1, label: '€'}
    ];
    return doscount_signs;
  }
}
