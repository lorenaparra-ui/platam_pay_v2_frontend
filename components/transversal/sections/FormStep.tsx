"use client"

import React, { useState } from 'react';
import { Control, FieldValues, UseFormGetValues, UseFormTrigger, useWatch } from "react-hook-form";
import { Check } from "lucide-react";
import { cn } from "@/utils/cn";
import { FormStep } from "@/interfaces/form";
import type { FormFieldConfig } from "@/interfaces/section";
import type { Option } from "@/interfaces/form";
import { SectionInformationForm } from "./SectionsInformationForm";
import { Button } from "@/components/transversal/buttons/Button";
import { evaluateCondition, convertLegacyToCondition } from "@/utils/evaluateCondition";

/** Determina si un paso debe mostrarse según dependency/dependencyValue del paso. */
function isStepVisible(
  step: FormStep,
  getValues: UseFormGetValues<FieldValues>
): boolean {
  if (!step.dependency || step.dependencyValue === undefined) return true;
  const current = getValues(step.dependency);
  return current === step.dependencyValue;
}

/** Determina si un campo debe validarse según sus dependencias (solo se validan campos visibles). */
function isFieldVisible(
  field: FormFieldConfig,
  getValues: UseFormGetValues<FieldValues>
): boolean {
  if (!field.dependency) return true;
  const current = getValues(field.dependency);
  const expected = field.dependencyValue;
  if (expected === undefined || expected === null) return false;
  if (typeof expected === "object" && expected !== null && "value" in expected) {
    return current === (expected as Option).value;
  }
  return current === expected;
}

interface StepperProps<T extends FieldValues> {
    steps: FormStep[];
    control: Control<FieldValues>;
    trigger: UseFormTrigger<T>;
    getValues: UseFormGetValues<FieldValues>;
    orientation?: 'horizontal' | 'vertical';
    submitLabel?: string;
    isSubmitting?: boolean;
    onComplete?: (data: T) => void;
}

export const Stepper = <T extends FieldValues>({
    steps,
    control,
    trigger,
    getValues,
    orientation = 'horizontal',
    submitLabel = "Enviar Solicitud",
    isSubmitting = false,
}: StepperProps<T>) => {
    const [currentStep, setCurrentStep] = useState(1);
    useWatch({ control }); // re-render cuando cambian valores del formulario (para recalcular pasos visibles)

    const visibleSteps = steps.filter((step) => isStepVisible(step, getValues));
    const totalSteps = visibleSteps.length;

    const currentStepIndex = visibleSteps.findIndex((s) => s.step === currentStep);
    const effectiveIndex = currentStepIndex >= 0 ? currentStepIndex : 0;
    const currentStepData = visibleSteps[effectiveIndex] ?? null;
    const isLastStep = effectiveIndex === visibleSteps.length - 1;

    const handleNext = async () => {
        if (!currentStepData) return;

        const allFields = currentStepData.sections.flatMap((section) => section.fields);
        const visibleFields = allFields.filter((field) => isFieldVisible(field, getValues));
        const fieldsToValidate = visibleFields.map((field) => field.name);

        const isValid =
            fieldsToValidate.length > 0
                ? await trigger(fieldsToValidate as Parameters<UseFormTrigger<T>>[0])
                : true;
        if (isValid) {
            const nextStep = visibleSteps[effectiveIndex + 1];
            if (nextStep) setCurrentStep(nextStep.step);
        }
    };

    const handlePrev = () => {
        const prevStep = visibleSteps[effectiveIndex - 1];
        if (prevStep) setCurrentStep(prevStep.step);
    };

    // Helper to get step title (using first section title as fallback)
    const getStepTitle = (step: FormStep) => {
        return step.sections[0]?.section || `Paso ${step.step}`;
    };

    return (
         <div className={cn(
            "flex gap-8",
            orientation === 'vertical' ? "flex-row" : "flex-col"
        )}>
            {/* Stepper Indicator */}
            <div className={cn(
                "flex",
                orientation === 'vertical' ? "flex-col w-64 shrink-0 space-y-8 border-r border-slate-100 dark:border-slate-800 pr-8" : "flex-row justify-between items-center w-full  dark:border-slate-800 pb-6"
            )}>
                {visibleSteps.map((step, index) => {
                    const isActive = step.step === currentStep;
                    const isCompleted = effectiveIndex > index;

                    return (
                        <div key={step.step} className={cn(
                            "flex items-center group relative",
                            orientation === 'vertical' ? "w-full" : "flex-1 last:flex-none"
                        )}>
                            <div className={cn(
                                "flex items-center",
                                orientation === 'horizontal' && index !== visibleSteps.length - 1 && "w-full"
                            )}>
                                <div className={cn(
                                    "flex items-center gap-3 relative z-10",
                                    orientation === 'vertical' ? "w-full p-2 rounded-lg transition-colors" : ""
                                )}>
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300",
                                        isActive ? "border-primary bg-primary-500 light:text-primary-foreground shadow-primary scale-110" :
                                            isCompleted ? "border-primary-500 bg-primary-500 " :
                                                "border-slate-200 text-slate-400 dark:border-slate-700 dark:text-slate-500"
                                    )}>
                                        {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                                    </div>
                                    <span className={cn(
                                        "font-medium text-sm transition-colors duration-300",
                                        isActive ? "text-primary-600 dark:text-primary-400" :
                                            isCompleted ? "text-slate-600 dark:text-slate-300" :
                                                "text-slate-400 dark:text-slate-600"
                                    )}>
                                        {getStepTitle(step)}
                                    </span>
                                </div>

                                {/* Connector Line (Horizontal) */}
                                {orientation === 'horizontal' && index !== visibleSteps.length - 1 && (
                                    <div className="flex-1 h-[2px] mx-4 bg-slate-100 dark:bg-primary-500 relative">
                                        <div 
                                            className="absolute top-0 left-0 h-full  transition-all duration-500 ease-out"
                                            style={{ width: isCompleted ? '100%' : '0%' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Step Content */}
            <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {currentStepData?.sections.map((section) => (
                    <SectionInformationForm
                        key={section.section}
                        columns={section.columns || 2}
                        control={control}
                        section={section.section}
                        fields={section.fields}
                    />
                ))}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex gap-3">
                        {effectiveIndex > 0 && (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handlePrev}
                                disabled={isSubmitting}
                            >
                                Atrás
                            </Button>
                        )}
                    </div>

                    <div className="flex gap-3">
                        {isLastStep ? (
                            <Button
                                type="submit"
                                variant="default"
                                disabled={isSubmitting}
                                className={cn(isSubmitting && "opacity-80 cursor-wait")}
                            >
                                {isSubmitting ? "Enviando..." : submitLabel}
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                variant="default"
                                onClick={handleNext}
                            >
                                Siguiente
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};