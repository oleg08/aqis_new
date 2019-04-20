export interface AssistantInvoice {
  id?: number;
  identifier?: string;
  invoice_type_id?: number;
  tenant_name?: string;
  date_start?: Date;
  date_end?: Date;
  sent?: Date;
  sum?: number;
  image_url?: string;
  created_at?: Date;
  updated_at?: Date;
}
