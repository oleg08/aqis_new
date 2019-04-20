import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {InvoiceType} from '../../interfaces/invoice-type';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-aqis-invoice-type-invoices',
  templateUrl: './invoice-type-invoices.component.html',
  styleUrls: ['./invoice-type-invoices.component.scss'],
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
export class InvoiceTypeInvoicesComponent implements OnInit {

  @Input() invoice_type: InvoiceType;
  @Output() onSend: EventEmitter<object> = new EventEmitter<object>();
  constructor() { }

  ngOnInit() {
  }

  send(invoice_id: number) {
    this.onSend.emit({ assistant_invoice_id: invoice_id });
  }

  removeInvoice(invoice_id: number) {
    const self = this;
    self.invoice_type.unsent_assistant_invoices = self.invoice_type.unsent_assistant_invoices.filter(inv => inv.id !== invoice_id);
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

}
