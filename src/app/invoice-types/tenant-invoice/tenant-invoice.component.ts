import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { InvoiceType } from '../../interfaces/invoice-type';

@Component({
  selector: 'app-aqis-tenant-invoice',
  templateUrl: './tenant-invoice.component.html',
  styleUrls: ['./tenant-invoice.component.scss']
})
export class TenantInvoiceComponent implements OnInit {

  identifier: string;
  originalIdentifier: string;
  defaultIdentifier = true;

  @Input() invoice_type: InvoiceType;
  @Input() tenant_name: string;
  @Output() onSaveInvoice: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  setIdentifier(invoice_type: InvoiceType) {
    const self = this;
    self.identifier = invoice_type.start_identifier;
    self.originalIdentifier = invoice_type.start_identifier;
  }

  setDefaultIdentifier() {
    const self = this;
    setTimeout(() => {
      this.defaultIdentifier = true;
      self.identifier = self.originalIdentifier;
    });
  }

  identifierChanged() {
    const self = this;
    if (self.defaultIdentifier) self.defaultIdentifier = false;
  }

  saveInvoice() {
    const self = this;

    if (!self.identifier) { return; }

    const first_date: Date = self.invoice_type.date_range[0];
    const second_date: Date = self.invoice_type.date_range[1];

    const date_start: Date = new Date(
      first_date.getFullYear(), first_date.getMonth(), first_date.getDate(), 19, 0
    );

    const date_end: Date = new Date(
      second_date.getFullYear(), second_date.getMonth(), second_date.getDate(), 19, 0
    );
    const params = {
      date_start: date_start,
      date_end: date_end,
      identifier: self.identifier,
      sum: self.invoice_type.assistant_cost,
      invoice_type_id: self.invoice_type.id
    };
    self.onSaveInvoice.emit(params);
  }

}
