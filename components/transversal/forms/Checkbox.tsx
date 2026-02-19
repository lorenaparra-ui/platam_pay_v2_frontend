import * as React from "react";
import { Check } from "lucide-react";
import { Control, Controller, FieldValues, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils/cn";
import { FormField } from "@/interfaces/form";

export type CheckboxProps<T extends FieldValues> = Omit<
  FormField<T>,
  "control"
> & { control: Control<T>; dependency?: string; dependencyValue?: string | number | Date  };

export const Checkbox = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  className,
  dependency,
  dependencyValue,
  ...props
}: CheckboxProps<T>) => {
  const depCurrent = useWatch({ control, name: dependency ?? name });

  if (!control) {
    console.error(
      `Checkbox component (name="${name}") is missing 'control' prop and is not wrapped in a FormProvider.`,
    );
    return null;
  }
  if (dependency && depCurrent !== dependencyValue) {
    return null;
  }

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
      >
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={undefined}
        render={({ field, fieldState }) => {
          const { value, ...fieldRest } = field;
          return (
            <>
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id={name}
                  className={cn(
                    "peer h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-slate-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary-400 checked:border-primary-400 dark:border-slate-600 dark:bg-slate-950 dark:checked:bg-primary-400 dark:checked:border-primary-400",
                    fieldState.error && "border-red-500",
                    className,
                  )}
                  {...fieldRest}
                  checked={!!value}
                  {...props}
                />
                <Check
                  className="absolute left-0 top-0 h-4 w-4 hidden peer-checked:block text-white pointer-events-none"
                  strokeWidth={3}
                />
              </div>

              {fieldState.error && (
                <p className="text-sm text-red-400 dark:text-red-400 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};
Checkbox.displayName = "Checkbox";
