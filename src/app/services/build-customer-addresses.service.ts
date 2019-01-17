import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuildCustomerAddressesService {

  constructor() { }
  handler(head_quarter, comment_address, customer_addresses) {
    if (head_quarter) {
      customer_addresses.push({
        city_address: head_quarter
      });
    }

    if (comment_address) {
      customer_addresses.push({
        city_address: comment_address
      });
    }
    return customer_addresses;
  }
}
