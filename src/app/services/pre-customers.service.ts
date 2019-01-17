import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreCustomer } from '../interfaces/pre-customer';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreCustomersService {

  constructor(private http: HttpClient) { }

  getPreCustomers() {
    return this.http.get<any>(environment.serverUrl + '/pre_customers.json')
      .toPromise()
      .then(res => <any>res)
      .then(data => { return data; });
  }

  getPreCustomer(id) {
    return this.http.get<any>(environment.serverUrl + '/pre_customers/' + id + '.json')
      .toPromise()
      .then(res => <PreCustomer>res.data)
      .then(data => {  return data });
  }
}
