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
  main_email_templates?: EmailTemplates[];
  created_at?: string;
  updated_at?: string;
}
