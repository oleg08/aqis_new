import { Injectable } from '@angular/core';
import {Customer} from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class IterateCustomersService {

  constructor() { }

  handle(customer_ids) {
    const ids: number[] = [];
    const customers: object[] = [];

    customer_ids.forEach(id => {
      ids.push(id[0]);
      const obj: Customer = {};
      obj.label = id[2];
      obj.name  = id[2];
      obj.id    = id[0];
      obj.value = id[0];
      obj.zip   = id[1];
      customers.push(obj);
    });
    return { customer_ids: ids, customers: customers };
  }
}
