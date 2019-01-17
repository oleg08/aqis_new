export interface StatesCustomers {
  label: string;
  value: string;
  items: SubStates[];
}

export interface SubStates {
  id?: number;
  value?: number;
  label?: string;
  category_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryStatus {
  id?: number;
  label: string;
  value?: string;
  created_at?: string;
  updated_at?: string;
  statuses: SubStates[];
}
