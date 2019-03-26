import { Project } from './project';
import { User } from './user';

export interface InvoiceType {
  id?: number;
  name?: string;
  projects?: Project[];
  users?: User[];
  period?: string;
  created_at?: string;
  updated_at?: string;
}
