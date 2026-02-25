import { partnerClient } from "@/infrastructure/api/partner-client";
import type { Partner } from "../interfaces";
import { parsePartner } from "../schemas";
import { ApiError } from "@/infrastructure/api/partner-client";

const MOCK_DELAY_MS = 800;

const mockPartnerData: Partner = {
  id: "1",
  type_partner: "client",
  country_code: "CO",
  company_name: "Platam Group SAS",
  trade_name: "Platam",
  acronym: "PTM",
  logo_url: "https://via.placeholder.com/150",
  co_branding_logo_url: "",
  primary_color: "#f07e0c",
  secondary_color: "#043B8C",
  light_color: "#F3F4F6",
  sales_rep_role_name: "Sales Rep",
  sales_rep_role_name_plural: "Sales Reps",
  api_key_hash: "hashed_key",
  notification_email: "notificaciones@platam.com",
  webhook_url: "https://api.platam.com/webhook",
  send_sales_rep_voucher: false,
  disbursement_notification_email: "disbursement@platam.com",
  default_rep_id: "1",
  default_category_id: "1",
};

const simulateNetworkDelay = <T>(data: T, delayMs = MOCK_DELAY_MS): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
};

export const partnerService = {
  getById: async (partnerId: string): Promise<Partner> => {
    

    if (partnerId === "1") {
      const mockResponse = await simulateNetworkDelay({ ...mockPartnerData, id: partnerId });
      return parsePartner(mockResponse);
    }

    const response = await partnerClient.get<Partner>(`/${partnerId}`);
    return parsePartner(response);
  },

  /**
   * Obtiene un partner por ID. Pensado para Server Components.
   * Retorna null si no existe (404) o el ID es inválido; lanza en otros errores.
   */
  getPartnerById: async (partnerId: string): Promise<Partner | null> => {
    if (!partnerId?.trim()) return null;
    try {
      return await partnerService.getById(partnerId);
    } catch (err) {
      if (err instanceof ApiError && err.statusCode === 404) return null;
      throw err;
    }
  },

  getCategories: (partnerId: number) => [{ value: "170", label: "VAEL 30" }],
};