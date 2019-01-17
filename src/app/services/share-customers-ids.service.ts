import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareCustomersIdsService {

  private customersIdsSource = new BehaviorSubject<Array<string>>(null);
  currentCustomersIds = this.customersIdsSource.asObservable();

  constructor () {}

  changeCustomersIds(customers_ids: Array<string>) {
    this.customersIdsSource.next(customers_ids);
  }
}
