import {Businesses} from './businesses';
import {StandardizedBusiness} from './standardized-businesses';

export interface CustomerEmailAddresses {
  id?: number;
  name?: string;
  email?: string;
  assistant_id?: number;
}

export interface AssignedUser {
  email?: string;
}

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
  office_name?: string;
  phone_1?: string;
  num_employees?: number;
  turnover?: number;
  activity?: string;
  link?: string;
  email_2?: string;
  assistant_email?: string;
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
  state?: string;
  customer_businesses?: Businesses[];
  standardized_businesses?: StandardizedBusiness[];
  customer_tenants?: object[];
  agent_id?: number;
  assistant_id?: number;
  assigned_as_agent?: boolean;
  assigned_as_assistant?: boolean;
  agent_user?: AssignedUser;
  assistant_user?: AssignedUser;
  customer_tenant_id?: number;
  email_addresses?: CustomerEmailAddresses[];
}
