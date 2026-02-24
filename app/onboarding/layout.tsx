"use client";

import React from "react";
import Image from "next/image";
import { Header } from "@/components/transversal/sections/Header";
import { ThemeToggle } from "@/components/transversal/buttons/ThemeToggle";
import { usePartner, PartnerThemeProvider } from "@/features/partners";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default function  OnboardingLayout({ children, params }: OnboardingLayoutProps) {
  const { id } = React.use(params);
  const { data: partner, isLoading } = usePartner(id);

  const secondaryLogo = React.useMemo(() => {
    if (isLoading) {
      return (
        <div className="w-24 h-8 bg-light-800 dark:bg-dark-700 rounded animate-pulse" />
      );
    }

    if (partner?.logo_url) {
      return (
        <Image
          src={partner.logo_url}
          alt={partner.trade_name || "Partner logo"}
          width={96}
          height={32}
          className="h-8 w-auto object-contain"
        />
      );
    }

    if (partner?.trade_name) {
      return (
        <span className="text-lg font-semibold text-light-50 dark:text-white">
          {partner.trade_name}
        </span>
      );
    }

    return null;
  }, [partner, isLoading]);

  return (
    <PartnerThemeProvider partner={partner}>
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
              href: `/onboarding/${id}/natural-person`,
            },
            {
              label: "Comenzar solicitud para empresas",
              href: `/onboarding/${id}/legal-entity`,
            },
            { label: "Montar pedido", href: "#" },
          ]}
          actions={<ThemeToggle />}
          sticky
        />
        <main>{children}</main>
      </div>
    </PartnerThemeProvider>
  );
}
