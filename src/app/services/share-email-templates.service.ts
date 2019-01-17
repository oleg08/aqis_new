import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmailAddresses } from '../interfaces/email-addresses';

@Injectable({
  providedIn: 'root'
})
export class ShareEmailTemplatesService {

  private templatesSource = new BehaviorSubject<EmailAddresses[]>(null);
  currentTemplates = this.templatesSource.asObservable();

  constructor () {}

  changeTemplates(templates: EmailAddresses[]) {
    this.templatesSource.next(templates);
  }
}
