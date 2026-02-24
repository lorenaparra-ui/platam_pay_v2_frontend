import { FieldType } from "@/interfaces/section";
import type { SectionInformationField } from "@/interfaces/section";

export const creditRequestSection: SectionInformationField = {
  section: "Solicitud de crédito",
  columns: 1,
  fields: [
    {
      name: "clr_hunter_id",
      label: "Representante de Ventas",
      typefield: FieldType.Select,
      placeholder: "Buscar",
      optionsName: "salesRepresentatives",
      rules: { required: "El representante de ventas es requerido" },
    },
    {
      name: "clr_requested_loc",
      label: "¿Qué cupo de línea de crédito necesitas para tu negocio?",
      typefield: FieldType.InputNumber,
      integerOnly: true,
      useGrouping: true,
      numberFormatLocale: "es-CO",
      prefix: "$",
      rules: { required: "El monto solicitado es requerido" },
    },
    {
      name: "clr_pj_eeff_files",
      label: "Estados financieros",
      typefield: FieldType.File,
      placeholder: "Elegir archivos",
      multiple: true,
      accept: ".pdf,.xlsx,.xls,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      maxSize: 10 * 1024 * 1024,
      condition: {
        field: "clr_requested_loc",
        operator: ">=",
        value: 10000000,
      },
      rules: { required: "Debe adjuntar los estados financieros cuando el cupo solicitado es mayor o igual a 10 millones" },
    },
  ],
};
