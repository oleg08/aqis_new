import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetKeywordService {

  constructor(private http: HttpClient) { }

  get (email) {
    const self = this;
    return self.http.post<any>(`${environment.serverUrl}/social_registrations.json`, { email: email })
      .toPromise()
      .then(res => <any>res)
      .then(data => data );
  }
}
