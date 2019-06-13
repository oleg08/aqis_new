export interface StandardizedBusiness {
  id?: number;
  name?: string;
  code?: string;
  iaf?: string;
  selected?: boolean;
  standardized_business_keys: StandardizedBusinessKey[];
  stringify_keys: string[];
}

export interface StandardizedBusinessKey {
  id?: number;
  label?: string;
  standardized_business_id?: number;
}
