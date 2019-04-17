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
  tenant?: Tenant;
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
  created_at?: string;
  updated_at?: string;
}
