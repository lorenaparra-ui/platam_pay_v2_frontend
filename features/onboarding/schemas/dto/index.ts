import { keysToSnakeCase } from "@/utils/camelToSnake";
import type { LegalEntityDTO } from "./legal-entity.dto";
import type { NaturalPersonDTO } from "./natural-person.dto";

export type { LegalEntityDTO, LegalEntityShareholderDTO } from "./legal-entity.dto";
export type { NaturalPersonDTO } from "./natural-person.dto";

/**
 * Convierte el body del formulario (camelCase o snake_case) al DTO para el backend (snake_case).
 * DRY: una sola función de transformación para todos los payloads de onboarding.
 */
function formToBackendDTO<T>(formData: Record<string, unknown>): T {
  return keysToSnakeCase(formData) as T;
}

/**
 * Mapper: datos del formulario de persona jurídica -> DTO backend (snake_case).
 */
export function formToLegalEntityDTO(formData: Record<string, unknown>): LegalEntityDTO {
  return formToBackendDTO<LegalEntityDTO>(formData);
}

/**
 * Mapper: datos del formulario de persona natural -> DTO backend (snake_case).
 */
export function formToNaturalPersonDTO(formData: Record<string, unknown>): NaturalPersonDTO {
  return formToBackendDTO<NaturalPersonDTO>(formData);
}
