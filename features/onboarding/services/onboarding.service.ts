import { userClient } from "@/infrastructure/api/user-client";
import {
  formToLegalEntityDTO,
  formToNaturalPersonDTO,
  type LegalEntityDTO,
  type NaturalPersonDTO,
} from "@/features/onboarding/schemas/dto";
import type { LegalEntitySchema } from "@/features/onboarding/schemas/legal-entity-schema";
import type { NaturalPersonSchema } from "@/features/onboarding/schemas/natural-person-schema";

/** Payload del formulario (camelCase o snake_case) para persona jurídica. */
export type LegalEntityFormPayload = LegalEntitySchema | Record<string, unknown>;

/** Payload del formulario (camelCase o snake_case) para persona natural. */
export type NaturalPersonFormPayload = NaturalPersonSchema | Record<string, unknown>;

const ONBOARDING_LEGAL_ENTITY_PATH = "/onboarding/legal-entity";
const ONBOARDING_NATURAL_PERSON_PATH = "/onboarding/natural-person";

/**
 * Servicio de onboarding. Centraliza el envío de formularios al backend.
 * - Recibe el body en el formato del formulario (camelCase o snake_case).
 * - Transforma a snake_case (DTO) y envía al backend.
 * - DRY: una sola lógica de transformación para ambos flujos.
 */
export const onboardingService = {
  /**
   * Envía el onboarding de persona jurídica.
   * Convierte el body del formulario a snake_case y hace POST al backend.
   */
  submitLegalEntity: async (body: LegalEntityFormPayload): Promise<void> => {
    const dto: LegalEntityDTO = formToLegalEntityDTO(
      body as Record<string, unknown>
    );
    await userClient.post<unknown>(ONBOARDING_LEGAL_ENTITY_PATH, dto);
  },

  /**
   * Envía el onboarding de persona natural.
   * Convierte el body del formulario a snake_case y hace POST al backend.
   */
  submitNaturalPerson: async (body: NaturalPersonFormPayload): Promise<void> => {
    const dto: NaturalPersonDTO = formToNaturalPersonDTO(
      body as Record<string, unknown>
    );
    await userClient.post<unknown>(ONBOARDING_NATURAL_PERSON_PATH, dto);
  },
};

/** Alias para compatibilidad con código que use OnboardingService. */
export const OnboardingService = onboardingService;
