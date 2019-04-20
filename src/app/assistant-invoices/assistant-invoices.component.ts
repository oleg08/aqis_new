import { Component, OnInit } from '@angular/core';
import { AssistantInvoicesDataService } from './assistant-invoices-data.service';
import {AssistantInvoice} from '../interfaces/assistant-invoice';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-assistant-invoices',
  templateUrl: './assistant-invoices.component.html',
  styleUrls: ['./assistant-invoices.component.scss'],
  providers: [AssistantInvoicesDataService, MessageService],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AssistantInvoicesComponent implements OnInit {

  assistant_invoices: AssistantInvoice[];
  original_assistant_invoices: AssistantInvoice[];
  msgs: Message[] = [];

  constructor(private invoicesData: AssistantInvoicesDataService,
              private messageService: MessageService,
              private http: HttpClient) { }

  ngOnInit() {
    const self = this;
    this.invoicesData.get().then(assistant_invoices => {
      self.assistant_invoices = assistant_invoices;
      self.original_assistant_invoices = assistant_invoices;
    });
  }

  search(data) {
    const self = this;
    const assistant_invoices: AssistantInvoice[] = data['searched_invoices'];
    self.assistant_invoices = [...assistant_invoices];
  }

  goToLink(url) {
    window.open(url, '_blank');
  }

  send(invoice: AssistantInvoice) {
    const self = this;
    self.http.post(`${environment.serverUrl}/send_assistant_invoices/${invoice.id}.json`, {}).subscribe(
      res => {
        if (res['assistant_invoice']) {
          invoice.sent = res['assistant_invoice']['sent'];
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `The Invoice was sent`});
        } else {
          self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't send Invoice`});
        }
      },
      err => {
        self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Can't send Invoice`});
      },
    );
  }

}
