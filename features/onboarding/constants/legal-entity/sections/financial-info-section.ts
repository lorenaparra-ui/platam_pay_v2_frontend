import { FieldType } from "@/interfaces/section";
import type { SectionInformationField } from "@/interfaces/section";



export const financialInfoSection: SectionInformationField = {
  section: "Información Financiera",
  columns: 2,
  fields: [
    {
      name: "clr_bus_total_assets",
      label: "Total de activos del negocio",
      typefield: FieldType.InputNumber,
      integerOnly: true,
      useGrouping: true,
      numberFormatLocale: "es-CO",
      prefix: "$",
      rules: { required: "Total de activos requerido" },
    },
    {
      name: "clr_bus_monthly_income",
      label: "Ventas mensuales",
      typefield: FieldType.InputNumber,
      integerOnly: true,
      useGrouping: true,
      numberFormatLocale: "es-CO",
      prefix: "$",
      rules: { required: "Ventas mensuales requeridas" },
    },
    {
      name: "clr_bus_monthly_expenses",
      label: "Gastos mensuales en inventario",
      typefield: FieldType.InputNumber,
      integerOnly: true,
      useGrouping: true,
      numberFormatLocale: "es-CO",
      prefix: "$",
      rules: { required: "Gastos mensuales requeridos" },
    },
    
  ],
};
