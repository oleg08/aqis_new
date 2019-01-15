import { Businesses } from './businesses';

export interface BusinessDomain {
  id?: number;
  value?: any;
  label?: string;
  description?: string;
  businesses?: Businesses[];
  copy_businesses?: Businesses[];
  new_business?: string;
  searchTerm?: string;
  created_at?: string;
  updated_at?: string;
}
