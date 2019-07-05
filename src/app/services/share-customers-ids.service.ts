import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareCustomersIdsService {

  private customersIdsSource = new BehaviorSubject<string[]>([]);
  currentCustomersIds = this.customersIdsSource.asObservable();

  constructor () {}

  changeCustomersIds(customers_ids: string[]) {
    this.customersIdsSource.next(customers_ids);
  }
}
