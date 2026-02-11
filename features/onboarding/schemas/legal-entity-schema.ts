import { z } from "zod"

export const legalEntitySchema = z.object({
  // Identificadores y Metadata
  pa_id: z.string(),
  clr_cp_id: z.string().optional().or(z.literal("")),
  clr_hunter_id: z.string(),
  __form_id: z.string().optional(),
  __refer: z.string().optional(),
  __is_ajax: z.string().optional(),

  // Solicitud
  clr_requested_loc: z.string().min(1, "El monto solicitado es requerido"),
  Show_cupo: z.string().optional(),

  // Datos de la Empresa
  clr_first_name: z.string().min(1, "La Razón Social es requerida"),
  clr_doc_number: z.string().min(1, "El NIT es requerido"),
  clr_city: z.string().min(1, "La ciudad es requerida"),
  clr_bus_address: z.string().min(1, "La dirección principal es requerida"),
  clr_email: z.string().email("Correo electrónico inválido"),
  clr_pj_year_of_establishment: z.string().min(1, "Año de constitución requerido"),

  // Representante Legal
  clr_pj_legal_rep_name: z.string().min(1, "Nombres del representante requeridos"),
  clr_pj_legal_rep_last_name: z.string().min(1, "Apellidos del representante requeridos"),
  clr_pj_legal_rep_doc_type: z.string().min(1, "Tipo de documento requerido"),
  clr_pj_legal_rep_doc_number: z.string().min(1, "Número de documento requerido"),
  clr_phone: z.string().min(1, "Celular del representante requerido"),
  direccion_del_representante_legal: z.string().min(1, "Dirección del representante requerida"),

  // Datos del Negocio
  clr_bus_name: z.string().min(1, "Nombre comercial requerido"),
  clr_bus_type: z.string().min(1, "Tipo de negocio requerido"),
  clr_bus_seniority: z.string().min(1, "Antigüedad del negocio requerida"),
  clr_bus_num_locations: z.string().min(1, "Cantidad de locales requerida"),
  clr_bus_num_employees: z.string().min(1, "Número de empleados requerido"),
  clr_bus_flagship_m2: z.string().min(1, "Tamaño del local requerido"),
  
  // Arriendo
  clr_has_rent: z.string().min(1, "Requerido"), // "Sí" | "No"
  clr_rent: z.string().optional().or(z.literal("")), // Requerido si clr_has_rent es "Sí"

  // Información Financiera
  show_assets: z.string().optional(),
  clr_bus_total_assets: z.string().min(1, "Total de activos requerido"),
  show_income: z.string().optional(),
  clr_bus_monthly_income: z.string().min(1, "Ventas mensuales requeridas"),
  show_exp: z.string().optional(),
  clr_bus_monthly_expenses: z.string().min(1, "Gastos mensuales requeridos"),
  
  // Estados Financieros (Archivo)
  clr_pj_eeff: z.object({
    id: z.string().optional(),
    url: z.string().url("URL de archivo inválida").optional(),
  }).optional().nullable(),

  // Cliente Aliado
  alias: z.string().optional(),
  clr_bus_is_client: z.string(), // "Sí" | "No"
  show_mothly_purchases: z.string().optional(),
  clr_bus_monthly_purchases: z.string().optional().or(z.literal("")),
  show_mothly_purchases_copy: z.string().optional(),
  clr_bus_current_purchases: z.string().optional().or(z.literal("")),

  // Accionistas
  clr_pj_shareholders_repeater: z.array(
    z.object({
      shareholder_name: z.string().min(1, "Nombre requerido"),
      shareholder_last_name: z.string().min(1, "Apellido requerido"),
      shareholder_doc_type: z.string().min(1, "Tipo doc requerido"),
      shareholder_doc_number: z.string().min(1, "Num doc requerido"),
      shareholder_percent: z.string().min(1, "Porcentaje requerido"),
      beneficial_owners: z.string().optional().or(z.literal("")),
    })
  ).min(1, "Debe agregar al menos un accionista"),

 
})

export type LegalEntitySchema = z.infer<typeof legalEntitySchema>


