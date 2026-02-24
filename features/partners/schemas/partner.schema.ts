import { z } from "zod";
import type { Partner } from "../interfaces";

export const partnerTypeSchema = z.enum(["client", "supplier", "distributor"]);

export const partnerSchema = z.object({
  id: z.string(),
  type_partner: partnerTypeSchema,
  country_code: z.string(),
  company_name: z.string(),
  trade_name: z.string(),
  acronym: z.string(),
  logo_url: z.string().url().or(z.literal("")),
  co_branding_logo_url: z.string().url().or(z.literal("")),
  primary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Color hexadecimal inválido"),
  secondary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Color hexadecimal inválido"),
  light_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Color hexadecimal inválido"),
  sales_rep_role_name: z.string(),
  sales_rep_role_name_plural: z.string(),
  api_key_hash: z.string(),
  notification_email: z.string().email(),
  webhook_url: z.string().url().or(z.literal("")),
  send_sales_rep_voucher: z.boolean(),
  disbursement_notification_email: z.string().email(),
  default_rep_id: z.string(),
  default_category_id: z.string(),
});

export type PartnerSchema = z.infer<typeof partnerSchema>;

export const parsePartner = (data: unknown): Partner => {
  return partnerSchema.parse(data);
};

export const safeParsePartner = (data: unknown) => {
  return partnerSchema.safeParse(data);
};
