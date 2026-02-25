"use client";

import { CreditaApplicationForm } from "@/features/onboarding/components/credit -application/CreditApplicationForm";
import {
  defaultValuesNaturalPerson,
  naturalPersonFormFields,
} from "@/features/onboarding/constants/natural-person";
import { naturalPersonSchema } from "@/features/onboarding/schemas/natural-person-schema";
import { partnerService } from "@/features/partners/services/partners.service";
import { salesRepresentativeService } from "@/features/partners/services/sales-representative";
import {
  getOnboardingDraft,
  saveOnboardingDraft,
  clearOnboardingDraft,
  mergeOnboardingDefaults,
} from "@/store/onboarding/onboarding.persistence";
import { useOnboardingStore } from "@/store/onboarding/onboarding.store";
import { useConfigData } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const handleSubmit = async (data: unknown) => {
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
  const {
    currentStep,
    accumulatedData,
    setCurrentStep,
    setAccumulatedData,
    reset: resetStore,
    setProgressStatus,
  } = useOnboardingStore();

  const [salesRepresentatives, setSalesRepresentatives] = useState<any[]>([]);
  const [partnerCategories, setPartnerCategories] = useState<any[]>([]);

  const flowKey = "sales-representative/natural-person";
  const partnerId = id;
  const enableSessionStorage = true;

  const initialDraft = useMemo(() => {
    if (typeof window === "undefined" || !enableSessionStorage || !partnerId || !flowKey)
      return null;
    const draft = getOnboardingDraft(partnerId, flowKey);
    if (draft) {
      useOnboardingStore.getState().hydrateFromDraft(draft);
    }
    return draft;
  }, [partnerId, flowKey, enableSessionStorage]);

  const mergedDefaults = useMemo(
    () =>
      mergeOnboardingDefaults(
        defaultValuesNaturalPerson as Record<string, unknown>,
        initialDraft?.accumulatedData ?? accumulatedData
      ),
    [initialDraft?.accumulatedData, accumulatedData]
  );

  const {
    control,
    handleSubmit: rhfHandleSubmit,
    reset,
    trigger,
    getValues,
  } = useForm({
    resolver: zodResolver(naturalPersonSchema) as never,
    defaultValues: mergedDefaults,
  });

  useLayoutEffect(() => {
    if (!partnerId || !flowKey) return;
    if (!enableSessionStorage || !initialDraft) {
      resetStore();
      return;
    }
    reset(
      mergeOnboardingDefaults(
        defaultValuesNaturalPerson as Record<string, unknown>,
        initialDraft.accumulatedData
      ) as Parameters<typeof reset>[0]
    );
  }, [partnerId, flowKey]);

  useEffect(() => {
    setProgressStatus("in_progress");
    return () => setProgressStatus("draft");
  }, [setProgressStatus]);

  const handleBeforeNext = async (
    getValuesFn: () => Record<string, unknown>,
    nextStep: number
  ) => {
    const values = getValuesFn();
    const nextAccumulated = { ...accumulatedData, ...values };
    setAccumulatedData(nextAccumulated);
    setCurrentStep(nextStep);
    if (enableSessionStorage && partnerId && flowKey) {
      saveOnboardingDraft(partnerId, flowKey, {
        currentStep: nextStep,
        accumulatedData: nextAccumulated,
      });
    }
  };

  const onSubmitForm = async (data: unknown) => {
    try {
      setProgressStatus("completed");
      await handleSubmit(data);
      reset();
      resetStore();
      if (enableSessionStorage && partnerId && flowKey) {
        clearOnboardingDraft(partnerId, flowKey);
      }
    } catch (error) {
      setProgressStatus("draft");
    }
  };

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
              return { ...field, options: optionsValue };
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
        control={control}
        trigger={trigger}
        getValues={getValues}
        reset={reset}
        handleSubmit={rhfHandleSubmit}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onBeforeNext={handleBeforeNext}
        onSubmitForm={onSubmitForm}
      />
    </div>
  );
}
