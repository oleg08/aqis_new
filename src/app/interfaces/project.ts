export interface Project {
  id?: number;
  name?: string;
  email?: string;
  gmail?: string;
  email_sending?: string;
  email_password?: string;
  gmail_password?: string;
  external_token?: string;
  active?: any;
  zip_from?: string|number;
  zip_to?: string|number;
  businesses?: Array<object>;
  project_businesses?: Array<object>;
}
