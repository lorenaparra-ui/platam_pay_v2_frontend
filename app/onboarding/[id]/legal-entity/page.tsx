"use client";

import { CreditaApplicationForm } from "@/features/onboarding/components/credit -application/CreditApplicationForm";
import {
  defaultValuesLegalEntity,
  legalEntityFormFields,
} from "@/features/onboarding/constants/legal-entity";
import { legalEntitySchema } from "@/features/onboarding/schemas/legal-entity-schema";
import { partnerService } from "@/features/partners/services/partners.service";
import { salesRepresentativeService } from "@/features/partners/services/sales-representative";
import { useConfigData } from "@/store";
import React, { useEffect, useState } from "react";

const handleSubmit = async (data: unknown) => {
  try {
  } catch (error) {
    console.error(error);
  }
};

export default function LegalEntityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { documentTypes, businessTypes, businessSeniority, cities } = useConfigData();
  const [salesRepresentatives, setSalesRepresentatives] = useState<
    { value: string; label: string }[]
  >([]);
  const [partnerCategories, setPartnerCategories] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (id) {
      const reps = salesRepresentativeService.getAllByPartner(Number(id));
      setSalesRepresentatives(reps);
      const categories = partnerService.getCategories(Number(id));
      setPartnerCategories(categories);
    }
  }, [id]);

  const options: Record<string, { value: string; label: string }[]> = {
    salesRepresentatives,
    documentTypes,
    businessTypes,
    businessSeniority,
    cities,
    partnerCategories,
  };

  const formFields = legalEntityFormFields
    .map((step) => ({
      ...step,
      sections: step.sections.map((section) => ({
        ...section,
        fields: section.fields.map((field) => {
          if (field.optionsName) {
            const optionsValue = options[field.optionsName];
            if (optionsValue) {
              return {
                ...field,
                options: optionsValue,
              };
            }
          }
          return field;
        }),
      })),
    }))
    .filter((step) => step.sections.length > 0);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground">
            Solicitud de Cupo Empresas
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Completa la información para solicitar tu crédito Platam.
          </p>
        </div>
      </div>
    
      <CreditaApplicationForm
        formFields={formFields}
        schema={legalEntitySchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValuesLegalEntity}
      />
    
    </div>
  );
}
