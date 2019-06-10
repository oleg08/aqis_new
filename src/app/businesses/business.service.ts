import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Businesses } from '../interfaces/businesses';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }

  get () {
    const self = this;
    return self.http.get<any>(`${environment.serverUrl}/businesses.json`)
      .toPromise()
      .then(res => <Businesses[]>res['businesses'])
      .then(data => data);
  }
}
