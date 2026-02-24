import { FieldType } from "@/interfaces/section";
import type { SectionInformationField } from "@/interfaces/section";

export const clientRelationSection: SectionInformationField = {
  section: "Relación con el Cliente",
  columns: 1,
  fields: [
    {
      name: "clr_bus_is_client",
      label: "¿Es cliente actual con ustedes?",
      typefield: FieldType.Select,
      options: [
        { label: "Sí", value: "Si" },
        { label: "No", value: "No" },
      ],
      rules: { required: "Requerido" },
    },
    {
      name: "clr_bus_monthly_purchases",
      label: "¿Cuánto suele comprar mensualmente?",
      typefield: FieldType.InputNumber,
      integerOnly: true,
      useGrouping: true,
      numberFormatLocale: "es-CO",
      prefix: "$",
      dependency: "clr_bus_is_client",
      dependencyValue: "Si",
      rules: { required: "Monto requerido" },
    },
  ],
};
