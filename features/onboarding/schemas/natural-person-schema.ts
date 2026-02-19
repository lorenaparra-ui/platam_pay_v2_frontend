import { z } from "zod";

export const naturalPersonSchema = z
  .object({
  patner_id: z.string().optional().or(z.literal("")), // Puede venir vacío
  patner_category_id: z.string().optional().or(z.literal("")),
  application_type: z.string().optional(),
  sales_rep_id: z.string().min(1, "Requerido"),
  
  // Datos Personales
  first_name: z.string().min(1, "El nombre es requerido"),
  last_name: z.string().min(1, "El apellido es requerido"),
  doc_type: z.string().min(1, "Tipo de documento requerido"),
  doc_number: z.string().min(1, "Número de documento requerido"),
  birth_date: z.string().min(1, "Fecha de nacimiento requerida"), // Podrías agregar .regex() para validar formato fecha
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(1, "Teléfono requerido"),

  // Datos del Negocio
  business_name: z.string().min(1, "Nombre del negocio requerido"),
  business_relation: z.string().min(1, "Relación con el negocio requerida"),
  business_city: z.string().min(1, "Ciudad requerida"),
  business_address: z.string().min(1, "Dirección requerida"),
  business_type: z.string().min(1, "Tipo de negocio requerido"),
  business_seniority: z.string().min(1, "Antigüedad requerida"),
  business_number_of_employees: z.number().min(1, "Número de empleados requerido"),
  business_number_of_locations: z.number().min(1, "Número de sedes requerido"),
  business_flagship_m2: z.number().min(1, "Tamaño del local requerido"),
  
  // Arriendo
  business_has_rent: z.string().min(1, "Requerido"), // "Sí" o "No"
  business_rent_amount: z.number().optional(),

  // Financiera
  show_assets: z.number().min(1, "Requerido"),
  total_assets: z.number().min(1, "Total activos requerido"),
  monthly_income: z.number().min(1, "Ingresos mensuales requeridos"),
  monthly_expenses: z.number().min(1, "Gastos mensuales requeridos"),
  
  // Cliente Aliado
  is_partner_client: z.string().min(1, "Requerido"),
  mothly_partner_purchases: z.number().optional(),
  current_purchases: z.string().optional().or(z.literal("")),
  
  // Solicitud
  clr_requested_loc: z.number().min(1, "Monto solicitado requerido"),
})
  .superRefine((data, ctx) => {
    if (data.application_type === "sales_representative" && (!data.patner_category_id || data.patner_category_id.length < 1)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Categoría de socio requerida", path: ["patner_category_id"] });
    }
  });

export type NaturalPersonSchema = z.infer<typeof naturalPersonSchema>;