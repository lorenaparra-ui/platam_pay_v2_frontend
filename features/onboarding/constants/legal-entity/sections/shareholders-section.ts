import { FieldType } from "@/interfaces/section";
import type { SectionInformationField } from "@/interfaces/section";

export const SHAREHOLDERS_REPEATER_NAME = "clr_pj_shareholders_repeater";

export const shareholdersSection: SectionInformationField = {
  section: "Datos de los accionistas",
  className: 'grid-cols-1 md:grid-cols-2',
  repeaterName: SHAREHOLDERS_REPEATER_NAME,
  fields: [
    {
      name: "clr_pj_shareholders_repeater.0.shareholder_doc_type",
      label: "Tipo documento",
      typefield: FieldType.Select,
      optionsName: "documentTypes",
      rules: { required: "Tipo de documento requerido" },
    },
    {
      name: "clr_pj_shareholders_repeater.0.shareholder_doc_number",
      label: "Número documento",
      typefield: FieldType.Input,
      type: "text",
      rules: { required: "Número de documento requerido" },
    },
    {
      name: "clr_pj_shareholders_repeater.0.shareholder_name",
      label: "Nombres",
      typefield: FieldType.Input,
      type: "text",
      rules: { required: "Nombres requeridos" },
      condition: {
        field: "clr_pj_shareholders_repeater.0.shareholder_doc_type",
        operator: "!==",
        value: "NIT",
      },
    },
    {
      name: "clr_pj_shareholders_repeater.0.shareholder_last_name",
      label: "Apellidos",
      typefield: FieldType.Input,
      type: "text",
      rules: { required: "Apellidos requeridos" },
      condition: {
        field: "clr_pj_shareholders_repeater.0.shareholder_doc_type",
        operator: "!==",
        value: "NIT",
      },
    },
    {
      name: "clr_pj_shareholders_repeater.0.shareholder_percent",
      label: "Participación %",
      typefield: FieldType.Input,
      type: "text",
      rules: { required: "Participación requerida" },
    },
  ],
};
