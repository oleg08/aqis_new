import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassCustomersIdsService {

  private customersIdsSource = new BehaviorSubject<object>(null);
  currentCustomers = this.customersIdsSource.asObservable();

  constructor () {}

  changeCustomers (customers: object) {
    this.customersIdsSource.next(customers);
  }
}
