import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EmailResponses } from './email-responses';

@Injectable({
  providedIn: 'root'
})
export class EmailResponsesService {

  constructor(private http: HttpClient) { }

  get() {
    const self = this;
    return self.http.get<any>(`${environment.serverUrl}/email_responses.json`)
      .toPromise()
      .then(res => <EmailResponses[]>res['email_responses'])
      .then(data => data);
  }
}
