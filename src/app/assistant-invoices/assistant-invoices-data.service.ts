import { Injectable } from '@angular/core';
import { AssistantInvoice } from '../interfaces/assistant-invoice';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssistantInvoicesDataService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<any>(`${environment.serverUrl}/assistant_invoices.json`)
      .toPromise()
      .then(res => <AssistantInvoice[]>res['assistant_invoices'])
      .then(data => data);
  }
}
