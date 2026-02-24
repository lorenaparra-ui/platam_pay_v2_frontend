import { FieldType } from "@/interfaces/section";
import type { SectionInformationField } from "@/interfaces/section";

export const salesRepOpinionSection: SectionInformationField = {
  section: "Opinión Representante de Ventas",
  columns: 1,
  fields: [
    {
      name: "clr_sales_rep_knowledge_time",
      label: "¿Hace cuánto conoces al cliente?",
      typefield: FieldType.Select,
      options: [
        { label: "Lo acabo de conocer", value: "Lo acabo de conocer" },
        { label: "Menos de 3 meses", value: "Menos de 3 meses" },
        { label: "Entre 3 y 6 meses", value: "Entre 3 y 6 meses" },
        { label: "Más de 6 meses", value: "Más de 6 meses" },
      ],
      rules: { required: "Requerido" },
    },
    {
      name: "clr_sales_rep_confidence",
      label: "En una escala del 1 al 10, ¿qué tan seguro/a te sientes de prestarle al cliente?",
      typefield: FieldType.InputNumber,
      useGrouping: false,
      suffix: "puntos",
      rules: {
        required: "Requerido",
        min: { value: 1, message: "Mínimo 1" },
        max: { value: 10, message: "Máximo 10" },
      },
    },
    {
      name: "clr_sales_rep_suggested_limit",
      label: "Con base en tu conocimiento del cliente y su negocio, ¿cuál sería el cupo de crédito apropiado para él?",
      typefield: FieldType.InputNumber,
      integerOnly: true,
      useGrouping: true,
      numberFormatLocale: "es-CO",
      prefix: "$",
      rules: { required: "Monto sugerido requerido" },
    },
  ],
};
