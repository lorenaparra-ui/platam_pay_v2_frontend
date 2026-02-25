"use client";

import React from "react";
import { Header } from "@/components/transversal/sections/Header";
import { ThemeToggle } from "@/components/transversal/buttons/ThemeToggle";
import { usePartnersStore } from "@/store/partners/partners.store";

interface OnboardingLayoutClientProps {
  partnerId: string;
  children: React.ReactNode;
}

export function OnboardingLayoutClient({ partnerId, children }: OnboardingLayoutClientProps) {
  const partner = usePartnersStore((state) => state.partner);

  const secondaryLogo = React.useMemo(() => {
    if (!partner) return null;
    if (partner.logo_url) {
      return (
        <img
          src={partner.logo_url}
          alt={partner.trade_name || "Partner logo"}
          width={96}
          height={32}
          className="h-8 w-auto object-contain"
        />
      );
    }
    if (partner.trade_name) {
      return (
        <span className="text-lg font-semibold text-light-50 dark:text-white">
          {partner.trade_name}
        </span>
      );
    }
    return null;
  }, [partner]);

  return (
    <div className="min-h-screen bg-light-50 dark:bg-dark-950 transition-colors duration-300 font-sans">
      <Header
        primaryLogo={
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "var(--partner-primary)" }}
            >
              <div className="w-4 h-4 border-2 border-white rounded" />
            </div>
            <span className="text-xl font-bold text-light-50 dark:text-white">
              Platam Pay
            </span>
          </div>
        }
        secondaryLogo={secondaryLogo}
        navigation={[
          {
            label: "Solicitud de cupo para personas",
            href: `/onboarding/${partnerId}/natural-person`,
          },
          {
            label: "Comenzar solicitud para empresas",
            href: `/onboarding/${partnerId}/legal-entity`,
          },
          { label: "Montar pedido", href: "#" },
        ]}
        actions={<ThemeToggle />}
        sticky
      />
      <main>{children}</main>
    </div>
  );
}
