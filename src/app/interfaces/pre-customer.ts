export interface PreCustomer {
  id?: number;
  name?: string;
  company_name?: string;
  uid?: string;
  address?: string;
  firm?: string;
  person?: string;
  person_2?: string;
  email?: string;
  email_1?: string;
  email_2?: string;
  city?: string;
  zip?: string;
  phone?: string;
  phone_1?: string;
  phone_2?: string;
  message?: string;
  project_id?: number;
  new?: boolean;
  project_object?: {
    label?: string,
    value?: number
  };
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}
