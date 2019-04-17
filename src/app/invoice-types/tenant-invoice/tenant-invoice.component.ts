import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { InvoiceType } from '../../interfaces/invoice-type';

@Component({
  selector: 'app-aqis-tenant-invoice',
  templateUrl: './tenant-invoice.component.html',
  styleUrls: ['./tenant-invoice.component.scss']
})
export class TenantInvoiceComponent implements OnInit {

  @Input() invoice_type: InvoiceType;
  @Input() tenant_name: string;
  @Output() onSaveInvoice: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  saveInvoice() {
    const self = this;

    const params = {
      date_start: self.invoice_type.date_range[0],
      date_end: self.invoice_type.date_range[1],
      sum: self.invoice_type.assistant_cost,
      invoice_type_id: self.invoice_type.id
    };
    self.onSaveInvoice.emit(params);
  }

}
