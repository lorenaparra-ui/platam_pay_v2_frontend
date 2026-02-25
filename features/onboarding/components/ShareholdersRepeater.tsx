"use client";

import { Input } from "@/components/transversal/forms/Input";
import { Select } from "@/components/transversal/forms/Select";
import { Button } from "@/components/transversal/buttons/Button";
import { FieldType, FormFieldConfig, SectionInformationField } from "@/interfaces/section";
import type { ArrayPath, Path } from "react-hook-form";
import { Control, FieldValues, useFieldArray, useWatch } from "react-hook-form";
import {
  DEFAULT_SHAREHOLDER_ITEM,
  getTotalShareholding,
  SHAREHOLDING_THRESHOLD,
} from "@/features/onboarding/constants/shareholding";
import { cn } from "@/utils/cn";
import { Plus, Trash2 } from "lucide-react";

export interface ShareholdersRepeaterProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  section: SectionInformationField<T> & {
    repeaterName: string;
    optionsForRepeater?: Record<string, { value: string; label: string }[]>;
  };
  threshold?: number;
}

function fieldNameForIndex(name: string, index: number): string {
  return name.replace(/\.0\./, `.${index}.`);
}

export function ShareholdersRepeater<T extends FieldValues = FieldValues>({
  control,
  section,
  threshold = SHAREHOLDING_THRESHOLD,
}: ShareholdersRepeaterProps<T>) {
  const name = section.repeaterName as ArrayPath<T>;
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const watched = useWatch({ control, name: name as Path<T> });
  const totalPercent = getTotalShareholding(
    watched as unknown as { shareholder_percent?: string | number }[]
  );
  const canAddMore = totalPercent < threshold;

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          {section.section}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Total participación: <strong>{totalPercent.toFixed(1)}%</strong>
          {totalPercent < threshold && (
            <span className="ml-2">(mínimo {threshold}% para continuar)</span>
          )}
        </p>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={cn(
              "rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-slate-50/50 dark:bg-slate-800/30"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Accionista {index + 1}
              </span>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div
              className={cn(
                "grid gap-4",
                section.columns === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1"
              )}
            >
              {section.fields.map((fieldConfig) => {
                const fieldName = fieldNameForIndex(
                  fieldConfig.name as string,
                  index
                ) as Path<T>;
                const options = fieldConfig.optionsName
                  ? section.optionsForRepeater?.[fieldConfig.optionsName]
                  : undefined;
                const resolvedField: FormFieldConfig<T> = {
                  ...fieldConfig,
                  name: fieldName,
                  ...(options && { options }),
                };

                if (resolvedField.typefield === FieldType.Select) {
                  return (
                    <Select<T>
                      key={fieldName}
                      control={control}
                      name={resolvedField.name}
                      label={resolvedField.label}
                      rules={resolvedField.rules}
                      options={resolvedField.options ?? []}
                    />
                  );
                }
                return (
                  <Input<T>
                    key={fieldName}
                    control={control}
                    name={resolvedField.name}
                    label={resolvedField.label}
                    type={resolvedField.type ?? "text"}
                    rules={resolvedField.rules}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {canAddMore && (
        <Button
          type="button"
          variant="secondary"
          onClick={() => append(DEFAULT_SHAREHOLDER_ITEM as T[string])}
          className="w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar accionista
        </Button>
      )}
    </section>
  );
}
