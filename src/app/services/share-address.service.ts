import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareAddressService {

  private addressesSource = new BehaviorSubject<Array<object>>(null);
  currentAddresses = this.addressesSource.asObservable();

  constructor () {}

  changeAddresses(addresses: Array<object>) {
    this.addressesSource.next(addresses);
  }
}
