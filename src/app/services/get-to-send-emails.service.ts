import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToSendEmail } from '../interfaces/to-send-email';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetToSendEmailsService {

  to_send_emails: ToSendEmail[];

  constructor (private http: HttpClient) {}

  private extractData (res) {
    const self = this;

    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    self.to_send_emails = res;
    return self.to_send_emails || {};
  }

  get(): Observable<any> {
    const self = this;
    const url = `${environment.serverUrl}/to_send_emails.json`;
    return self.http.get(url).pipe(map(self.extractData));
  }
}
