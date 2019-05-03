import {Businesses} from './businesses';

export interface Customer {
  id?: number;
  name?: string;
  email?: string;
  value?: string|number;
  label?: string;
  description?: string;
  created_at?: Date|string;
  updated_at?: Date|string;
  identifier?: string;
  head_quarter?: string;
  phone_1?: string;
  num_employees?: number;
  turnover?: number;
  activity?: string;
  link?: string;
  email_2?: string;
  comment_address?: string;
  comment_firm?: string;
  phone_2?: string;
  responsible_name?: string;
  conversation?: string;
  zip?: number;
  city?: string;
  outlets?: string;
  google_task_id?: number;
  fn?: string;
  google_saved_connection?: any;
  customer_businesses?: Businesses[];
  customer_tenants?: object[];
}
