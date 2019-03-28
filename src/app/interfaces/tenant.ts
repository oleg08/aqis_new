import { InvoiceType } from './invoice-type';
import { User } from './user';
import { Project } from './project';

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
  users?: User[];
  projects?: Project[];
  created_at?: string;
  updated_at?: string;
}
