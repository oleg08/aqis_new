import {Component, Input, OnInit} from '@angular/core';
import {InvoiceType} from '../../interfaces/invoice-type';

@Component({
  selector: 'app-aqis-tenant-invoice',
  templateUrl: './tenant-invoice.component.html',
  styleUrls: ['./tenant-invoice.component.scss']
})
export class TenantInvoiceComponent implements OnInit {

  @Input() invoice_type: InvoiceType;
  @Input() tenant_name: string;

  constructor() { }

  ngOnInit() {
  }

}
