import * as React from "react"
import { cn } from "@/lib/utils/cn"
import { inputVariants } from "./Input"
import { Calendar } from "lucide-react"
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form"

export interface DatePickerProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue"> {
  name: Path<T>
  control: Control<T>
  label: string
  rules?: RegisterOptions<T>
}

export const DatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  className,
  ...props
}: DatePickerProps<T>) => {
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
              <input
                type="date"
                id={name}
                className={cn(
                  inputVariants({ variant: fieldState.error ? "error" : "default" }),
                  "pl-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer",
                  className
                )}
                {...field}
                value={field.value ?? ""}
                {...props}
              />
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400 pointer-events-none" />
            </div>

            {fieldState.error && (
              <p className="text-sm text-red-600 mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  )
}
DatePicker.displayName = "DatePicker"