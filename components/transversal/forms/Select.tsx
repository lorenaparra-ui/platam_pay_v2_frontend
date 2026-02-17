import * as React from "react"
import { cn } from "@/lib/utils/cn"
import { inputVariants } from "./Input"
import { ChevronDown } from "lucide-react"
import { Control, Controller, FieldValues, useWatch } from "react-hook-form"
import { Option, FormField } from "@/interfaces/form"

export type SelectProps<T extends FieldValues> =
  Omit<FormField<T>, "type" | "options"> &
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name" | "defaultValue" | "value" | "onChange"> & {
    control: Control<T>
    options: Option[]
  }

export const Select = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  className,
  options,
  variant,
  // @ts-ignore
  optionsName,
  ...props
}: SelectProps<T>) => {
  const { dependency, dependencyValue } = props;
  const depCurrent = dependency ? useWatch({ control, name: dependency as any }) : undefined;
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
        render={({ field, fieldState }) => (
          <>
            <div className="relative">
              <select
                id={name}
                className={cn(
                  inputVariants({ variant: fieldState.error ? "error" : variant }),
                  "appearance-none pr-10 cursor-pointer",
                  className
                )}
                {...field}
                value={field.value ?? ""}
                {...props}
              >
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400 pointer-events-none" />
            </div>

            {fieldState.error && (
              <p className="text-sm text-red-400 dark:text-red-400 mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  )
}
Select.displayName = "Select"
