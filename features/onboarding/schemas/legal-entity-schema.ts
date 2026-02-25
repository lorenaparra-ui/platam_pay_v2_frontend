import { z } from "zod";
import { SHAREHOLDING_THRESHOLD } from "@/features/onboarding/constants/shareholding";

/** Acepta número o string (InputNumber puede enviar ambos). Requerido = no vacío. */
const requiredNumberOrString = (message: string) =>
  z
    .union([z.number(), z.string()])
    .refine(
      (v) =>
        v !== "" &&
        v !== undefined &&
        v !== null &&
        (typeof v === "string" ? String(v).trim().length > 0 : true),
      { message }
    );

/** Opcional: número o string (para campos condicionales o no usados en formulario). */
const optionalNumberOrString = () => z.union([z.number(), z.string()]).optional();

export const legalEntitySchema = z
  .object({
    application_type: z.string().optional(),

    // Identificadores y Metadata
    pa_id: z.string().min(1, "Categoría de negocio requerida"),
    clr_cp_id: z.string().optional().or(z.literal("")),
    clr_hunter_id: z.string().optional(),
    __form_id: z.string().optional(),
    __refer: z.string().optional(),
    __is_ajax: z.string().optional(),

    // Solicitud (InputNumber)
    clr_requested_loc: requiredNumberOrString("El monto solicitado es requerido"),
    Show_cupo: z.string().optional(),

    // Datos de la Empresa (Input text/Select)
    clr_first_name: z.string().min(1, "La Razón Social es requerida"),
    clr_doc_number: z.string().min(1, "El NIT es requerido"),
    clr_city: z.string().min(1, "La ciudad es requerida"),
    clr_bus_address: z.string().min(1, "La dirección principal es requerida"),
    clr_email: z.string().email("Correo electrónico inválido"),
    clr_pj_year_of_establishment: z
        .number()
        .min(1, "Año de constitución requerido")
        .max(new Date().getFullYear(), "Año de constitución inválido"),

    // Representante Legal (Input / Select)
    clr_pj_legal_rep_name: z.string().min(1, "Nombres del representante requeridos"),
    clr_pj_legal_rep_last_name: z
      .string()
      .min(1, "Apellidos del representante requeridos"),
    clr_pj_legal_rep_doc_type: z.string().min(1, "Tipo de documento requerido"),
    clr_pj_legal_rep_doc_number: z.string().min(1, "Número de documento requerido"),
    clr_phone: z.string().min(1, "Celular del representante requerido"),
    direccion_del_representante_legal: z
      .string()
      .min(1, "Dirección del representante requerida"),

    // Datos del Negocio (Input, SearchSelect, Select, InputNumber)
    clr_bus_name: z.string().min(1, "Nombre comercial requerido"),
    clr_bus_type: z.string().min(1, "Tipo de negocio requerido"),
    clr_bus_seniority: z.string().min(1, "Antigüedad del negocio requerida"),
    clr_bus_num_locations: requiredNumberOrString("Cantidad de locales requerida"),
    clr_bus_num_employees: requiredNumberOrString("Número de empleados requerido"),
    clr_bus_flagship_m2: requiredNumberOrString("Tamaño del local requerido"),

    // Arriendo (Select + InputNumber condicional)
    clr_has_rent: z.string().min(1, "Requerido"),
    clr_rent: optionalNumberOrString(),

    // Información Financiera (InputNumber)
    show_assets: z.string().optional(),
    clr_bus_total_assets: requiredNumberOrString("Total de activos requerido"),
    show_income: z.string().optional(),
    clr_bus_monthly_income: requiredNumberOrString("Ventas mensuales requeridas"),
    show_exp: z.string().optional(),
    clr_bus_monthly_expenses: requiredNumberOrString(
      "Gastos mensuales requeridos"
    ),

    // Estados Financieros (Archivo) - no en formulario actual
    clr_pj_eeff: z
      .object({
        id: z.string().optional(),
        url: z.string().url("URL de archivo inválida").optional(),
      })
      .optional()
      .nullable(),

    /** Archivos de estados financieros (visible cuando cupo >= 10M). */
    clr_pj_eeff_files: z.array(z.any()).optional(),

    // Relación con el Cliente (Select + InputNumber condicional)
    alias: z.string().optional(),
    clr_bus_is_client: z.string().min(1, "Requerido"),
    show_mothly_purchases: z.string().optional(),
    clr_bus_monthly_purchases: optionalNumberOrString(),
    show_mothly_purchases_copy: z.string().optional(),
    clr_bus_current_purchases: z.string().optional().or(z.literal("")),

    // Accionistas (array - campos del repeater)
    clr_pj_shareholders_repeater: z
      .array(
        z.object({
          shareholder_name: z.string().min(1, "Nombre requerido"),
          shareholder_last_name: z.string().min(1, "Apellido requerido"),
          shareholder_doc_type: z.string().min(1, "Tipo doc requerido"),
          shareholder_doc_number: z.string().min(1, "Num doc requerido"),
          shareholder_percent: z.string().min(1, "Porcentaje requerido"),
          beneficial_owners: z.string().optional().or(z.literal("")),
        })
      )
      .min(1, "Debe agregar al menos un accionista"),

    // Paso condicional: Opinión Representante de Ventas (solo si application_type === "sales_representative")
    clr_sales_rep_knowledge_time: z.string().optional().or(z.literal("")),
    clr_sales_rep_confidence: optionalNumberOrString(),
    clr_sales_rep_suggested_limit: optionalNumberOrString(),
  })
  .superRefine((data, ctx) => {
    if (data.clr_has_rent === "Si") {
      const v = data.clr_rent;
      const isEmpty =
        v === "" ||
        v === undefined ||
        v === null ||
        (typeof v === "string" && v.trim().length === 0);
      if (isEmpty) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Monto de arriendo requerido",
          path: ["clr_rent"],
        });
      }
    }
  })
  .superRefine((data, ctx) => {
    if (data.clr_bus_is_client === "Si") {
      const v = data.clr_bus_monthly_purchases;
      const isEmpty =
        v === "" ||
        v === undefined ||
        v === null ||
        (typeof v === "string" && String(v).trim().length === 0);
      if (isEmpty) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Monto mensual requerido",
          path: ["clr_bus_monthly_purchases"],
        });
      }
    }
  })
  .superRefine((data, ctx) => {
    if (data.clr_sales_rep_confidence !== undefined && data.clr_sales_rep_confidence !== "") {
      const n =
        typeof data.clr_sales_rep_confidence === "string"
          ? Number(data.clr_sales_rep_confidence)
          : data.clr_sales_rep_confidence;
      if (Number.isNaN(n) || n < 1 || n > 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Debe ser un valor entre 1 y 10",
          path: ["clr_sales_rep_confidence"],
        });
      }
    }
  })
  .superRefine((data, ctx) => {
    const requested = data.clr_requested_loc;
    const num =
      typeof requested === "string" ? Number(requested) : Number(requested ?? 0);
    if (!Number.isNaN(num) && num >= 10_000_000) {
      const files = data.clr_pj_eeff_files;
      if (!files?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Debe adjuntar los estados financieros cuando el cupo solicitado es mayor o igual a 10 millones",
          path: ["clr_pj_eeff_files"],
        });
      }
    }
  })
  .superRefine((data, ctx) => {
    const repeater = data.clr_pj_shareholders_repeater;
    if (!Array.isArray(repeater) || repeater.length === 0) return;
    let total = 0;
    for (const item of repeater) {
      const v = item.shareholder_percent;
      if (v === undefined || v === null || v === "") continue;
      const n = typeof v === "string" ? Number(v) : v;
      total += Number.isNaN(n) ? 0 : n;
    }
    if (total < SHAREHOLDING_THRESHOLD) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `La participación total de accionistas debe ser al menos ${SHAREHOLDING_THRESHOLD}%`,
        path: ["clr_pj_shareholders_repeater"],
      });
    }
    if (total > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La participación total no puede superar 100%",
        path: ["clr_pj_shareholders_repeater"],
      });
    }
  });

export type LegalEntitySchema = z.infer<typeof legalEntitySchema>;
