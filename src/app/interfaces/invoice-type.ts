import { Project } from './project';
import { User } from './user';
import { Tenant } from './tenant';

export interface InvoiceType {
  id?: number;
  name?: string;
  projects?: Project[];
  users?: User[];
  tenant?: Tenant;
  period?: string;
  sign_image_url?: string;
  sign_image_content_type?: string;
  created_at?: string;
  updated_at?: string;
}
