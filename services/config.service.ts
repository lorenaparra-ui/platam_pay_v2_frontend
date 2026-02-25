import type { ConfigData } from "@/types/config.types";
import { transversalService } from "@/services/transversal.service";
import { phoneCodesItems } from "@/constants/phone_code";

export async function fetchConfigData(): Promise<ConfigData> {
  const [documentTypes, businessTypes, businessSeniority, cities] = await Promise.all([
    Promise.resolve(transversalService.getAllDocumentTypes()),
    Promise.resolve(transversalService.getAllCiiuCodes()),
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
