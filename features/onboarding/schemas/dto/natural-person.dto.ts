/**
 * Contrato con el backend: persona natural (snake_case).
 * Usado como payload al enviar el onboarding de persona natural.
 */
export interface NaturalPersonDTO {
  patner_id?: string;
  patner_category_id?: string;
  sales_rep_id: string;
  first_name: string;
  last_name: string;
  doc_type: string;
  doc_number: string;
  birth_date: string;
  email: string;
  phone: string;
  business_name: string;
  business_relation: string;
  business_city: string;
  business_address: string;
  business_type: string;
  business_seniority: string;
  business_number_of_employees: number;
  business_number_of_locations: number;
  business_flagship_m2: number;
  business_has_rent: string;
  business_rent_amount?: number;
  show_assets: number;
  total_assets: number;
  monthly_income: number;
  monthly_expenses: number;
  is_partner_client: string;
  mothly_partner_purchases?: number;
  authorization: boolean;
  clr_requested_loc: number;
  [key: string]: unknown;
}
