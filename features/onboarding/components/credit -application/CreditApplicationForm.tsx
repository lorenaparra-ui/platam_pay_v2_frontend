"use client";

import { FormStep } from "@/interfaces/form";
import type { Control, FieldValues, UseFormGetValues, UseFormHandleSubmit, UseFormReset, UseFormTrigger } from "react-hook-form";
import { Stepper } from "@/components/transversal/sections/FormStep";

export interface CreditApplicationFormProps<T extends FieldValues = FieldValues> {
  formFields: FormStep[];
  control: Control<FieldValues>;
  trigger: UseFormTrigger<T>;
  getValues: UseFormGetValues<FieldValues>;
  reset: UseFormReset<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  /** Paso actual (controlado por el padre). */
  currentStep: number;
  /** Callback al cambiar de paso. */
  onStepChange: (step: number) => void;
  /** Llamado antes de avanzar al siguiente paso (persistir en store/sessionStorage). */
  onBeforeNext: (getValuesFn: () => Record<string, unknown>, nextStep: number) => void | Promise<void>;
  /** Handler de envío del formulario (incluye lógica de reset store y clear draft en el padre). */
  onSubmitForm: (data: FieldValues) => void | Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

/**
 * Formulario de solicitud de crédito (presentacional).
 * Recibe control, handleSubmit, trigger, getValues, reset y estado del flujo como props.
 * La lógica de useForm, store y persistencia vive en la página.
 */
export function CreditaApplicationForm<T extends FieldValues = FieldValues>({
  formFields,
  control,
  trigger,
  getValues,
  reset,
  handleSubmit,
  currentStep,
  onStepChange,
  onBeforeNext,
  onSubmitForm,
  isSubmitting = false,
  submitLabel = "Enviar Solicitud",
}: CreditApplicationFormProps<T>) {
  return (
    <div className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
        <Stepper
          steps={formFields}
          control={control}
          trigger={trigger}
          getValues={getValues}
          currentStep={currentStep}
          onStepChange={onStepChange}
          onBeforeNext={onBeforeNext}
          submitLabel={submitLabel}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
}
