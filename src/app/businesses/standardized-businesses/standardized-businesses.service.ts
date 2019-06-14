import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {StandardizedBusiness} from '../../interfaces/standardized-businesses';

@Injectable({
  providedIn: 'root'
})
export class StandardizedBusinessesService {

  constructor(private http: HttpClient) { }

  get () {
    const self = this;
    return self.http.get<any>(environment.serverUrl + '/standardized_businesses.json')
      .toPromise()
      .then(res => <StandardizedBusiness[]>res['standardized_businesses'])
      .then(data => { return data; } );
  }

  addKeyword (id, params) {
    const self = this;
    return self.http.post<any>(`${environment.serverUrl}/st_businesses_add_key/${id}.json`, params)
      .toPromise()
      .then(res => <any>res)
      .then(data => data);
  }

  removeKeyword (id, params) {
    const self = this;
    return self.http.post<any>(`${environment.serverUrl}/st_businesses_remove_key/${id}.json`, params)
      .toPromise()
      .then(res => <any>res)
      .then(data => data);
  }

  assignByKeywords(id) {
    const self = this;
    return self.http.post<any>(`${environment.serverUrl}/assign_by_keywords/${id}.json`, {})
      .toPromise()
      .then(res => <any>res)
      .then(data => data);
  }

  assignSelected(id, business_ids: number[]) {
    const self = this;
    return self.http.post<any>(`${environment.serverUrl}/assign_selected_businesses/${id}.json`,
      { business_ids: business_ids })
      .toPromise()
      .then(res => <any>res)
      .then(data => data);
  }

  ownBusinesses(id) {
    const self = this;
    return self.http.get<any>(`${environment.serverUrl}/get_own_businesses/${id}.json`, {})
      .toPromise()
      .then(res => <any>res)
      .then(data => data);
  }

  removeOwnBusiness(id, business_id) {
    const self = this;
    return self.http.post<any>(`${environment.serverUrl}/remove_own_business/${id}.json`, { business_id: business_id })
      .toPromise()
      .then(res => <any>res)
      .then(data => data);
  }

  assignKeysToStBusinesses(business_ids: number[], keyword: string) {
    const self = this;
    return self.http.post<any>(`${environment.serverUrl}/assign_keys_st_businesses.json`,
      { business_ids: business_ids, keyword: keyword })
      .toPromise()
      .then(res => <any>res)
      .then(data => data);
  }

  addToCustomer(business_ids: number[], customer_id: number) {
    const self = this;
    return self.http.post<any>(`${environment.serverUrl}/st_bsns_assign_to_customer/${customer_id}.json`,
      { business_ids: business_ids })
      .toPromise()
      .then(res => <any>res)
      .then(data => data);
  }

  addToProject(business_ids: number[], project_id: number) {
    const self = this;
    return self.http.post<any>(`${environment.serverUrl}/st_bsns_assign_to_project/${project_id}.json`,
      { business_ids: business_ids })
      .toPromise()
      .then(res => <any>res)
      .then(data => data);
  }
}
