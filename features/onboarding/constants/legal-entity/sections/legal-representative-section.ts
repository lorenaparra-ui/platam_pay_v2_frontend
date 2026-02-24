import { FieldType } from "@/interfaces/section";
import type { SectionInformationField } from "@/interfaces/section";

export const legalRepresentativeSection: SectionInformationField = {
  section: "Datos del representante legal",
  columns: 2,
  fields: [
    {
      name: "clr_pj_legal_rep_name",
      label: "Nombres del representante legal",
      typefield: FieldType.Input,
      type: "text",
      rules: { required: "Nombres requeridos" },
    },
    {
      name: "clr_pj_legal_rep_last_name",
      label: "Apellidos del representante legal",
      typefield: FieldType.Input,
      type: "text",
      rules: { required: "Apellidos requeridos" },
    },
    {
      name: "clr_pj_legal_rep_doc_type",
      label: "Tipo de documento del representante legal",
      typefield: FieldType.Select,
      optionsName: "documentTypes",
      rules: { required: "Tipo de documento requerido" },
    },
    {
      name: "clr_pj_legal_rep_doc_number",
      label: "Número de documento del representante legal",
      typefield: FieldType.Input,
      type: "text",
      rules: { required: "Número de documento requerido" },
    },
    {
      name: "clr_phone",
      label: "Número de celular del representante legal",
      typefield: FieldType.Input,
      type: "text",
      placeholder: "Sin indicativo de país",
      rules: { required: "Celular requerido" },
    },
    {
      name: "direccion_del_representante_legal",
      label: "Dirección del representante legal",
      typefield: FieldType.Input,
      type: "text",
      rules: { required: "Dirección requerida" },
    },
  ],
};
