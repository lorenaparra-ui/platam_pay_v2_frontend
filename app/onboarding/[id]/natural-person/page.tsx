"use client";
import { CreditaApplicationForm } from "@/features/onboarding/components/credit -application/CreditApplicationForm";
import {
  defaultValuesNaturalPerson,
  naturalPersonFormFields,
} from "@/features/onboarding/constants/natural-person";
import { naturalPersonSchema } from "@/features/onboarding/schemas/natural-person-schema";
import { partnerService } from "@/features/partners/services/partners";
import { salesRepresentativeService } from "@/features/partners/services/sales-representative";
import { useConfigData } from "@/store";
import React, { useEffect, useState } from "react";

const handleSubmit = async (data: any) => {
  try {
  } catch (error) {}
};

export default function NaturalPersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  
  const {
    documentTypes,
    businessTypes,
    businessSeniority,
    cities,
    phoneCodes,
  } = useConfigData();

  const [salesRepresentatives, setSalesRepresentatives] = useState<any[]>([]);
  const [partnerCategories, setPartnerCategories] = useState<any[]>([]);
  useEffect(() => {
    if (id) {
      const reps = salesRepresentativeService.getAllByPartner(Number(id));
      setSalesRepresentatives(reps);
      const categories = partnerService.getCategories(Number(id));
      setPartnerCategories(categories);
    }
  }, [id]);

  const options: Record<string, any[]> = {
    salesRepresentatives,
    documentTypes,
    businessTypes,
    businessSeniority,
    cities,
    phoneCodes,
    partnerCategories,
  };

  const formFields = naturalPersonFormFields
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
            Solicitud de Cupo Personas
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Completa la información para solicitar tu crédito Platam.
          </p>
        </div>
      </div>
      <CreditaApplicationForm
        formFields={formFields}
        schema={naturalPersonSchema}
        onSubmit={handleSubmit}
        defaultValues={defaultValuesNaturalPerson}
      />
    </div>
  );
}
