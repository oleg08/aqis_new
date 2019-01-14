export interface User {
  id?: number;
  email?: string;
  name?: string;
  uid?: string;
  u_id?: string;
  g_provider?: string;
  tenant_id?: number;
  time_zone?: number;
  half_time_zone?: boolean;
  admin?: boolean;
  super_admin?: boolean;
  agent?: boolean;
  assistant?: boolean;
  created_at?: string;
  updated_at?: string;
}
