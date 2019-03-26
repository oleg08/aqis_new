import { InvoiceType } from './invoice-type';

export interface Tenant {
  id?: number;
  name?: string;
  uid?: string;
  email?: string;
  phone?: string;
  zip?: string;
  city?: string;
  address?: string;
  invoice_types?: InvoiceType[];
  created_at?: string;
  updated_at?: string;
}
