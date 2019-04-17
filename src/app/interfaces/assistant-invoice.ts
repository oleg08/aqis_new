export interface AssistantInvoice {
  id?: number;
  invoice_type_id?: number;
  date_start?: Date;
  date_end?: Date;
  sum?: number;
  image_url?: string;
  created_at?: Date;
  updated_at?: Date;
}
