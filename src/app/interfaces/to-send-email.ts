import { EmailTemplates } from './email-templates';

export interface ToSendEmail {
  id?: number;
  got_time?: string;
  got_email?: string;
  state?: string;
  dismissed?: boolean;
  c_tenant_email_template_id?: boolean;
  gmail_notification_id?: number;
  c_tenant_email_template?: EmailTemplates;
  answer?: string;
  gmail_notification?: object;
  selected_approve?: string;
  created_at?: any;
  updated_at?: any;
}
