import { Answer } from './answer';

export interface Question {
  id?: number;
  content?: string;
  order?: number;
  category_id?: number;
  tenant_id?: number;
  category_label?: string;
  new_label?: boolean;
  project_id?: number;
  answers?: Answer[];
  created_at?: string;
  updated_at?: string;
}
