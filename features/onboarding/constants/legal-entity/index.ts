import { FormStep } from "@/interfaces/form";
import { creditRequestSection } from "./sections/credit-request-section";
import { companySection } from "./sections/company-section";
import { legalRepresentativeSection } from "./sections/legal-representative-section";
import { businessDataSection } from "./sections/business-data-section";
import { financialInfoSection } from "./sections/financial-info-section";
import { clientRelationSection } from "./sections/client-relation-section";
import { shareholdersSection } from "./sections/shareholders-section";
import { salesRepOpinionSection } from "./sections/sales-rep-opinion-section";

export { creditRequestSection } from "./sections/credit-request-section";
export { companySection } from "./sections/company-section";
export { legalRepresentativeSection } from "./sections/legal-representative-section";
export { businessDataSection } from "./sections/business-data-section";
export { financialInfoSection } from "./sections/financial-info-section";
export { clientRelationSection } from "./sections/client-relation-section";
export { shareholdersSection } from "./sections/shareholders-section";
export { salesRepOpinionSection } from "./sections/sales-rep-opinion-section";

export const defaultValuesLegalEntity = {
  application_type: "legal_entity",
  pa_id: "",
  clr_cp_id: "",
  clr_hunter_id: "",
  clr_requested_loc: 0,
  Show_cupo: "",
  clr_first_name: "",
  clr_doc_number: "",
  clr_city: "",
  clr_bus_address: "",
  clr_email: "",
  clr_pj_year_of_establishment: "",
  clr_pj_legal_rep_name: "",
  clr_pj_legal_rep_doc_type: "",
  clr_pj_legal_rep_doc_number: "",
  clr_phone: "",
  direccion_del_representante_legal: "",
  clr_bus_name: "",
  clr_bus_type: "",
  clr_bus_seniority: "",
  clr_bus_num_locations: "",
  clr_bus_num_employees: "",
  clr_bus_flagship_m2: "",
  clr_has_rent: "",
  clr_rent: "",
  show_assets: "",
  clr_bus_total_assets: "",
  show_income: "",
  clr_bus_monthly_income: "",
  show_exp: "",
  clr_bus_monthly_expenses: "",
  alias: "",
  clr_bus_is_client: "",
  show_mothly_purchases: "",
  clr_bus_monthly_purchases: "",
  show_mothly_purchases_copy: "",
  clr_bus_current_purchases: "",
  clr_pj_shareholders_repeater: [
    {
      shareholder_name: "",
      shareholder_last_name: "",
      shareholder_doc_type: "",
      shareholder_doc_number: "",
      shareholder_percent: "",
      beneficial_owners: "",
    },
  ],
  clr_pj_eeff: {
    id: "",
    url: "",
  },
  clr_pj_eeff_files: [] as File[],
  clr_sales_rep_knowledge_time: "",
  clr_sales_rep_confidence: "",
  clr_sales_rep_suggested_limit: "",
  autoriz: "",
  __form_id: "",
  __refer: "",
  __is_ajax: "",
};

export const legalEntityFormFields: FormStep[] = [
  {
    step: 1,
    sections: [creditRequestSection, companySection],
  },
  {
    step: 2,
    sections: [legalRepresentativeSection],
  },
  {
    step: 3,
    sections: [businessDataSection, financialInfoSection, clientRelationSection],
  },
  {
    step: 4,
    sections: [shareholdersSection],
  },
  {
    step: 5,
    dependency: "application_type",
    dependencyValue: "sales_representative",
    sections: [salesRepOpinionSection],
  },
];
