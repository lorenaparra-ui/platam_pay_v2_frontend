import { FieldType } from "@/interfaces/section";
import type { SectionInformationField } from "@/interfaces/section";

export const companySection: SectionInformationField = {
  section: "Empresa",
  columns: 2,
  fields: [
    {
      name: "clr_first_name",
      label: "Razón Social",
      typefield: FieldType.Input,
      type: "text",
      placeholder: "Ejemplo: Company S.A.S",
      rules: { required: "La Razón Social es requerida" },
    },
    {
      name: "clr_doc_number",
      label: "NIT",
      typefield: FieldType.Input,
      type: "text",
      placeholder: "Sin dígito de verificación",
      rules: { required: "El NIT es requerido" },
    },
    {
      name: "clr_city",
      label: "Ciudad",
      typefield: FieldType.SearchSelect,
      placeholder: "Buscar",
      optionsName: "cities",
      rules: { required: "La ciudad es requerida" },
    },
    {
      name: "clr_bus_address",
      label: "Dirección principal de la empresa",
      typefield: FieldType.Input,
      type: "text",
      placeholder: "Ejemplo: Calle 123 #456",
      rules: { required: "La dirección es requerida" },
    },
    {
      name: "clr_email",
      label: "Correo electrónico de contacto",
      typefield: FieldType.Input,
      type: "email",
      rules: {
        required: "El correo es requerido",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Correo electrónico inválido",
        },
      },
    },
    {
      name: "clr_pj_year_of_establishment",
      label: "Año de constitución",
      typefield: FieldType.InputNumber,
      type: "number",
      useGrouping: false,
      placeholder: "YYYY",
      rules: { required: "El año de constitución es requerido",  },
    },
  ],
};
