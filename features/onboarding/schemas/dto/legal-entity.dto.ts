/**
 * Contrato con el backend: persona jurídica (snake_case).
 * Usado como payload al enviar el onboarding de empresa.
 */
export interface LegalEntityShareholderDTO {
  shareholder_name: string;
  shareholder_last_name: string;
  shareholder_doc_type: string;
  shareholder_doc_number: string;
  shareholder_percent: string;
  beneficial_owners?: string;
}

export interface LegalEntityDTO {
  application_type?: string;
  pa_id: string;
  clr_cp_id?: string;
  clr_hunter_id?: string;
  __form_id?: string;
  __refer?: string;
  __is_ajax?: string;
  clr_requested_loc: string | number;
  Show_cupo?: string;
  clr_first_name: string;
  clr_doc_number: string;
  clr_city: string;
  clr_bus_address: string;
  clr_email: string;
  clr_pj_year_of_establishment: number;
  clr_pj_legal_rep_name: string;
  clr_pj_legal_rep_last_name: string;
  clr_pj_legal_rep_doc_type: string;
  clr_pj_legal_rep_doc_number: string;
  clr_phone: string;
  direccion_del_representante_legal: string;
  clr_bus_name: string;
  clr_bus_type: string;
  clr_bus_seniority: string;
  clr_bus_num_locations: string | number;
  clr_bus_num_employees: string | number;
  clr_bus_flagship_m2: string | number;
  clr_has_rent: string;
  clr_rent?: string | number;
  show_assets?: string;
  clr_bus_total_assets: string | number;
  show_income?: string;
  clr_bus_monthly_income: string | number;
  show_exp?: string;
  clr_bus_monthly_expenses: string | number;
  alias?: string;
  clr_bus_is_client: string;
  show_mothly_purchases?: string;
  clr_bus_monthly_purchases?: string | number;
  show_mothly_purchases_copy?: string;
  clr_bus_current_purchases?: string;
  clr_pj_shareholders_repeater: LegalEntityShareholderDTO[];
  clr_pj_eeff?: { id?: string; url?: string } | null;
  clr_pj_eeff_files?: unknown[];
  clr_sales_rep_knowledge_time?: string;
  clr_sales_rep_confidence?: string | number;
  clr_sales_rep_suggested_limit?: string | number;
  [key: string]: unknown;
}
