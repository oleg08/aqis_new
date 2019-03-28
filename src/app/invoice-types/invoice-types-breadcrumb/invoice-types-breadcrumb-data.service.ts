import { Injectable } from '@angular/core';
import { InvoiceTypesBreadcrumb } from './invoice-types-breadcrumb.component';
import { InvoiceType } from '../../interfaces/invoice-type';
import { Tenant } from '../../interfaces/tenant';

@Injectable({
  providedIn: 'root'
})
export class InvoiceTypesBreadcrumbDataService {

  constructor() { }

  list(pos: number, tenant?: Tenant, invoice_type?: InvoiceType) {
    const data: InvoiceTypesBreadcrumb[] = [
      { name: 'Tenants', path: '/tenants' },
      { name: tenant.name, path: `/invoices_list/${tenant.id}` }
    ];
    if (invoice_type) { data.push({ name: invoice_type.name, path: `/invoice_types/${invoice_type.id}` }); }
    return data.slice(0, pos);
  }
}
