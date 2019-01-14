import { Keywords } from './keywords';

export interface EmailTemplates {
  id?: number;
  subject?: string;
  name?: string;
  greeting?: string;
  body?: string;
  body_html?: string;
  footer?: string;
  order?: number;
  new_label?: boolean;
  keywords?: Array<object>;
  hot_keywords?: Keywords[];
  keyword_ids?: Array<number>;
  hot_keyword_ids?: Array<number>;
  created_at?: any;
  updated_at?: any;
}
