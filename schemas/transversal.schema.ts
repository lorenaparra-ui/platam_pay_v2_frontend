import { z } from "zod";
import type { Option } from "@/interfaces/form";

/**
 * Esquema de un ítem de ciudad en la respuesta del API transversal.
 */
export const cityResponseItemSchema = z.object({
  externalId: z.string(),
  countryName: z.string(),
  countryCode: z.string(),
  stateName: z.string(),
  stateCode: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
  cityName: z.string(),
});

export type CityResponseItem = z.infer<typeof cityResponseItemSchema>;

/**
 * Esquema del array de ciudades devuelto por GET /transversal/cities.
 */
export const citiesResponseSchema = z.array(cityResponseItemSchema);

export type CitiesResponse = z.infer<typeof citiesResponseSchema>;

/**
 * Parsea la respuesta cruda del API y la convierte a Option[] (value/label)
 * para uso en selects del formulario.
 */
export function parseCitiesToOptions(data: unknown): Option[] {
  const parsed = citiesResponseSchema.safeParse(data);
  if (!parsed.success) {
    return [];
  }
  return parsed.data.map((item) => ({
    stateName: item.stateName,
    value: item.externalId,
    label: item.cityName,
  }));
}
