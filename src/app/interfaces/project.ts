export interface Project {
  id?;
  name?;
  email?: string;
  email_password?: string;
  external_token?: string;
  active?: any;
  zip_from?;
  zip_to?;
  businesses?: Array<object>;
  project_businesses?: Array<object>;
}
