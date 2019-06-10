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
}
