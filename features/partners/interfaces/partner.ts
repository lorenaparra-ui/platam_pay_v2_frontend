export type PartnerType = "client" | "supplier" | "distributor";

export interface Partner {
  id: string;
  type_partner: PartnerType;
  country_code: string;
  company_name: string;
  trade_name: string;
  acronym: string;
  logo_url: string;
  co_branding_logo_url: string;
  primary_color: string;
  secondary_color: string;
  light_color: string;
  sales_rep_role_name: string;
  sales_rep_role_name_plural: string;
  api_key_hash: string;
  notification_email: string;
  webhook_url: string;
  send_sales_rep_voucher: boolean;
  disbursement_notification_email: string;
  default_rep_id: string;
  default_category_id: string;
}
