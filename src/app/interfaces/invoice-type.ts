import { Project } from './project';
import { User } from './user';
import { Tenant } from './tenant';
import { AssistantInvoice } from './assistant-invoice';

export interface InvoiceType {
  id?: number;
  name?: string;
  projects?: Project[];
  users?: User[];
  assistant_invoices?: AssistantInvoice[];
  unsent_assistant_invoices?: AssistantInvoice[];
  tenant?: Tenant;
  start_identifier?: string;
  vat?: number;
  period?: string;
  date_range: Date[];
  assistant_cost: number;
  period_int?: number;
  discount?: number;
  discount_sign?: string;
  discount_sign_int?: number;
  agent_rate?: number;
  assistant_rate?: number;
  min_hours?: number;
  sign_image_url?: string;
  sign_image_content_type?: string;
  is_removable?: boolean;
  has_unsent_invoices?: boolean;
  created_at?: string;
  updated_at?: string;
}
