"use client";

import { useLayoutEffect } from "react";
import type { Partner } from "../interfaces";
import { PartnerThemeProvider } from "./PartnerThemeProvider";
import { usePartnersStore } from "@/store/partners/partners.store";

export interface OnboardingPartnerProviderProps {
  initialPartner: Partner;
  partnerId: string;
  children: React.ReactNode;
}

/**
 * Proveedor para el flujo de onboarding.
 * - Hidrata partnersStore con el partner obtenido en el Server Component.
 * - Aplica tema del partner. No hace fetch del partner en cliente.
 */
export function OnboardingPartnerProvider({
  initialPartner,
  partnerId,
  children,
}: OnboardingPartnerProviderProps) {
  const hydrate = usePartnersStore((state) => state.hydrate);

  useLayoutEffect(() => {
    hydrate(initialPartner);
    return () => {
      usePartnersStore.getState().reset();
    };
  }, [initialPartner, hydrate, partnerId]);

  return (
    <PartnerThemeProvider partner={initialPartner}>
      {children}
    </PartnerThemeProvider>
  );
}
