import { Question } from './question';
import { EmailTemplates } from './email-templates';

export interface Step {
  id?: number;
  name?: string;
  goal?: string;
  description?: string;
  order?: number;
  percent_weight?: number;
  weight?: number;
  time?: any;
  role?: string;
  step_role?: string;
  budget?: number;
  active?: boolean;
  questions?: Question[];
  c_tenant_steps?: CTenantStep[];
  main_email_templates?: EmailTemplates[];
  created_at?: string;
  updated_at?: string;
}

export interface CTenantStep {
  id?: number;
  name?: string;
  customer_name?: string;
  goal?: string;
  description?: string;
  order?: number;
  percent_weight?: number;
  weight?: number;
  time?: any;
  role?: string;
  step_role?: string;
  budget?: number;
  active?: boolean;
  questions?: Question[];
  main_email_templates?: EmailTemplates[];
  created_at?: string;
  updated_at?: string;
}
