import { userClient } from "@/infrastructure/api/user-client";
import { ApiError } from "@/infrastructure/api/user-client";
import type {
  BusinessInfoResponse,
  BusinessInfoResult,
} from "@/features/onboarding/interfaces/business-info";

/** Respuesta mock para NIT 901548471 (simulación de backend). */
const MOCK_BUSINESS_INFO_901548471: BusinessInfoResponse = {
  success: true,
  results: [
    {
      name: "PLATAM COLOMBIA SAS",
      nit: "901548471",
      category: "Empresa",
      status: "Información no disponible",
      primaryLegalePresentative: {
        name: "Nicolas Esteban Villa Pelaez",
        docType: "CC",
        docNumber: "1020769359",
      },
      tipoSociedad: "Sociedad comercial",
      tipoOrganizacion: "Sociedades por acciones simplificadas sas",
      fechaRenovacion: "2025/04/07",
    },
  ],
};

const NIT_MOCK = "901548471";
/** Cuando es true, no se llama al backend: para NITs distintos a 901548471 se retorna results vacío. */
const USE_MOCK =
  process.env.NEXT_PUBLIC_USE_MOCK_BUSINESS_INFO === "true";

/**
 * Simula un pequeño retardo de red (solo en modo mock).
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Consulta información empresarial a partir del número de NIT.
 * Integrado con user-client; en modo mock retorna datos simulados para NIT 901548471.
 *
 * @param nit - Número de identificación tributaria (NIT).
 * @returns Respuesta con success y results (lista de información empresarial).
 * @throws ApiError u otros errores de red cuando se usa el backend real.
 */
export async function getBusinessInfoByNit(
  nit: string
): Promise<BusinessInfoResponse> {
  const normalizedNit = nit?.trim() ?? "";

  if (!normalizedNit) {
    return {
      success: false,
      results: [],
    };
  }

  if (normalizedNit === NIT_MOCK) {
    await delay(300);
    return { ...MOCK_BUSINESS_INFO_901548471 };
  }

  if (USE_MOCK) {
    await delay(300);
    return { success: true, results: [] };
  }

  try {
    return await userClient.get<BusinessInfoResponse>(normalizedNit);
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("[BusinessInfo] API error:", error.message, error.statusCode);
    } else {
      console.error("[BusinessInfo] Unexpected error:", error);
    }
    throw error;
  }
}

export type { BusinessInfoResponse, BusinessInfoResult };
