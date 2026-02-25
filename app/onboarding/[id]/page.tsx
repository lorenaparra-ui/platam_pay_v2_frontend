"use client";

import React from "react";
import { MessageCircle, Wallet, FileText } from "lucide-react";
import { InformationCard } from "@/components/transversal/cards/InformationCard";
import { PartnerLink } from "@/features/partners";
import { usePartnersStore } from "@/store";
import { cn } from "@/utils/cn";

export default function PartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const partner = usePartnersStore((state) => state.partner);

  const partnerStyles = React.useMemo(() => {
    if (!partner) return {};
    return {
      primaryColor: partner.primary_color,
      secondaryColor: partner.secondary_color,
      lightColor: partner.light_color,
    };
  }, [partner]);

  if (!partner) {
    return (
      <div className="min-h-screen bg-light-950 dark:bg-dark-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-light-100 dark:text-dark-300 text-lg">
            Cargando información del partner...
          </p>
        </div>
      </div>
    );
  }

  const partnerName = partner.trade_name ?? "Platam";
  const rolePlural = partner.sales_rep_role_name_plural ?? "Asesores";

  return (
    <div className="min-h-screen bg-light-950 dark:bg-dark-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 font-sans">
      <div className="w-10/12 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1
            className={cn(
              "text-4xl font-bold mb-4 bg-clip-text text-transparent inline-block",
            )}
            style={{
              backgroundImage: `linear-gradient(135deg, ${partnerStyles.primaryColor ?? "var(--partner-primary)"} 0%, ${partnerStyles.secondaryColor ?? "var(--partner-secondary)"} 100%)`,
            }}
          >
            Portal {rolePlural}
          </h1>
          <p className="mt-4 text-xl text-light-100 dark:text-dark-300 max-w-3xl mx-auto">
            ¡Bienvenido al portal para {rolePlural} de {partnerName}! Aquí
            podrás realizar distintas acciones para ayudar a tus clientes a
            obtener financiamiento. Si aún no has sido inscrito en {partnerName}
            , por favor contacta a tu líder para que te inscriba.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <InformationCard
            layout="vertical"
            title="¡Utiliza nuestro bot de WhatsApp!"
            description="Con nuestro bot de WhatsApp podrás acceder a todas las herramientas de forma rápida y sencilla. Consulta el cupo disponible y presta más de tus clientes, y ofrece un mejor servicio de asesoramiento."
            icon={MessageCircle}
            usePartnerColors
            className={cn("border")}
            style={{
              borderColor: partnerStyles.primaryColor,
              "--hover-border-color": partnerStyles.primaryColor,
            } as React.CSSProperties}
          >
            <div className="w-full flex justify-center">
              <PartnerLink href="/dashboard" color={partnerStyles.primaryColor}>
                Acceder al bot
              </PartnerLink>
            </div>
          </InformationCard>

          <InformationCard
            layout="vertical"
            title={`Solicita un cupo ${partnerName} para tus clientes`}
            description={`Solicita la línea de crédito ${partnerName} para tus clientes personas o empresas y ofréceles una forma rápida y sencilla de acceder a financiamiento para sus negocios.`}
            icon={Wallet}
            usePartnerColors
            className={cn("border")}
            style={{
              borderColor: partnerStyles.primaryColor,
              "--hover-border-color": partnerStyles.primaryColor,
            } as React.CSSProperties}
          >
            <div className="w-full flex flex-col xl:flex-row justify-between gap-3">
              <PartnerLink
                href={`/onboarding/${id}/natural-person?application_type=sales_representative`}
                color={partnerStyles.primaryColor}
              >
                Solicitud para personas
              </PartnerLink>
              <PartnerLink
                href={`/onboarding/${id}/legal-entity`}
                color={partnerStyles.primaryColor}
              >
                Solicitud para empresas
              </PartnerLink>
            </div>
          </InformationCard>

          <InformationCard
            layout="vertical"
            title={`Monta tu pedido en ${partnerName}`}
            description={`Solicita los préstamos de tus clientes con ${partnerName}. Ingresa la información del pedido que el cliente quiere financiar y recibe una respuesta por WhatsApp.`}
            icon={FileText}
            usePartnerColors
            className={cn("border")}
            style={{
              borderColor: partnerStyles.primaryColor,
              "--hover-border-color": partnerStyles.primaryColor,
            } as React.CSSProperties}
          >
            <div className="w-full flex justify-center">
              <PartnerLink
                href={`/onboarding/${id}/natural-person`}
                color={partnerStyles.primaryColor}
              >
                Comenzar solicitud
              </PartnerLink>
            </div>
          </InformationCard>
        </div>
      </div>
    </div>
  );
}
