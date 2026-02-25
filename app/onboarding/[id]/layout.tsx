import { notFound } from "next/navigation";
import { partnerService } from "@/features/partners/services/partners.service";
import { OnboardingPartnerProvider } from "@/features/partners/components/OnboardingPartnerProvider";
import { OnboardingLayoutClient } from "@/features/onboarding/components/OnboardingLayoutClient";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

/**
 * Layout de onboarding con enfoque Server-First.
 * - Obtiene el partner en el servidor con getPartnerById(params.id).
 * - Si no existe, lanza notFound().
 * - Pasa el partner al PartnerProvider para hidratar el store en cliente.
 * - Evita fetch del partner en cada página.
 */
export default async function OnboardingLayout({ children, params }: OnboardingLayoutProps) {
  const id  = (await params).id
  const partner = await partnerService.getPartnerById(`${id}`);

  if (!partner) {
    notFound();
  }

  return (
    <OnboardingPartnerProvider initialPartner={partner} partnerId={id}>
      <OnboardingLayoutClient partnerId={id}>
        {children}
      </OnboardingLayoutClient>
    </OnboardingPartnerProvider>
  );
}
