import type { ConfigData } from "@/types/config.types";
import { transversalService } from "@/services/transversal";
import { phoneCodesItems } from "@/constants/phone_code";

const DEFAULT_COUNTRY_ID = 1;

/** Convierte items con value/label a Option[] (por si el origen tiene más campos). */
const toOptions = (items: { value: string; label: string }[]): ConfigData["documentTypes"] =>
  items.map(({ value, label }) => ({ value, label }));

/**
 * Servicio que alimenta el store de configuración.
 * Centraliza las llamadas a transversal (y en el futuro a API remota).
 * Separado del store para responsabilidad única y testabilidad.
 */
export async function fetchConfigData(): Promise<ConfigData> {
  const [documentTypes, businessTypes, businessSeniority, cities] = await Promise.all([
    Promise.resolve(transversalService.getAllDocumentTypes()),
    Promise.resolve(transversalService.getAllCiiuCodes()).then((items) =>
      items.map((item) => ({ value: item.value, label: item.label }))
    ),
    Promise.resolve(transversalService.getAllBusinessSeniority()),
    Promise.resolve(transversalService.getAllCities()),
  ]);

 

  return {
    documentTypes,
    businessTypes,
    businessSeniority,
    cities,
    phoneCodes: phoneCodesItems,
  };
}
