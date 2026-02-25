"use client";

import { CreditaApplicationForm } from "@/features/onboarding/components/credit -application/CreditApplicationForm";
import {
  defaultValuesLegalEntity,
  legalEntityFormFields,
} from "@/features/onboarding/constants/legal-entity";
import { getBusinessInfoByNit } from "@/features/onboarding/services/business-info.service";
import { legalEntitySchema } from "@/features/onboarding/schemas/legal-entity-schema";
import { partnerService } from "@/features/partners/services/partners.service";
import { salesRepresentativeService } from "@/features/partners/services/sales-representative";
import { useOnboardingStore } from "@/store/onboarding/onboarding.store";
import {
  getOnboardingDraft,
  saveOnboardingDraft,
  clearOnboardingDraft,
  mergeOnboardingDefaults,
} from "@/store/onboarding/onboarding.persistence";
import { useConfigData } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";

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
  const fetchedNitRef = useRef<string | null>(null);

  const [salesRepresentatives, setSalesRepresentatives] = useState<
    { value: string; label: string }[]
  >([]);
  const [partnerCategories, setPartnerCategories] = useState<
    { value: string; label: string }[]
  >([]);

  const flowKey = "legal-entity";
  const partnerId = id;
  const enableSessionStorage = true;

  const initialDraft = useMemo(() => {
    if (
      typeof window === "undefined" ||
      !enableSessionStorage ||
      !partnerId ||
      !flowKey
    )
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
        defaultValuesLegalEntity as Record<string, unknown>,
        initialDraft?.accumulatedData ?? accumulatedData,
      ),
    [initialDraft?.accumulatedData, accumulatedData],
  );

  const {
    control,
    handleSubmit: rhfHandleSubmit,
    reset,
    trigger,
    getValues,
    setValue,
  } = useForm({
    resolver: zodResolver(legalEntitySchema) as never,
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
        defaultValuesLegalEntity as Record<string, unknown>,
        initialDraft.accumulatedData,
      ) as Parameters<typeof reset>[0],
    );
  }, [partnerId, flowKey]);

  useEffect(() => {
    setProgressStatus("in_progress");
    return () => setProgressStatus("draft");
  }, [setProgressStatus]);

  const handleBeforeNext = async (
    getValuesFn: () => Record<string, unknown>,
    nextStep: number,
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
      console.error("Form submission error:", error);
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

  useEffect(() => {
    if (currentStep !== 2) return;

    const nit = accumulatedData?.clr_doc_number;
    const nitStr = typeof nit === "string" ? nit.trim() : "";
    if (!nitStr || fetchedNitRef.current === nitStr) return;

    let cancelled = false;
    fetchedNitRef.current = nitStr;

    getBusinessInfoByNit(nitStr)
      .then((res) => {
        if (cancelled) return;
        if (!res.success || !res.results?.[0]) return;

        const rep = res.results[0].primaryLegalePresentative;
        if (!rep) return;
        setValue("clr_pj_legal_rep_name", rep.name ?? "");
        setValue("clr_pj_legal_rep_doc_type", rep.docType ?? "");
        setValue("clr_pj_legal_rep_doc_number", rep.docNumber ?? "");
      })
      .catch(() => {
        if (!cancelled) fetchedNitRef.current = null;
      });

    return () => {
      cancelled = true;
    };
  }, [
    currentStep,
    accumulatedData?.clr_doc_number,
    setAccumulatedData,
    setValue,
  ]);

  const options: Record<string, { value: string; label: string }[]> = {
    salesRepresentatives,
    documentTypes,
    businessTypes,
    businessSeniority,
    cities,
    phoneCodes,
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
            Solicitud de Cupo Empresas
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
