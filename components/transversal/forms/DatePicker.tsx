import { cn } from "@/utils/cn";
import { inputVariants } from "./Input";
import { Calendar } from "lucide-react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { FormField } from "@/interfaces/form";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export type DatePickerProps<T extends FieldValues> = Omit<
  FormField<T>,
  "control"
> & { control: Control<T>; dependency?: string; dependencyValue?: any };

export const DatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  className,
  minDate,
  maxDate,
  dependency,
  dependencyValue,
  defaultValue: _defaultValue,
  defaultSelectValue,
  options,
  optionsName,
  ...restProps
}: DatePickerProps<T>) => {
  const min = minDate instanceof Date ? formatDate(minDate) : minDate;
  const max = maxDate instanceof Date ? formatDate(maxDate) : maxDate;

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
                  inputVariants({
                    variant: fieldState.error ? "error" : "default",
                  }),
                  "pl-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer",
                  className,
                )}
                min={min}
                max={max}
                {...field}
                value={field.value ?? ""}
                {...restProps}
              />
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400 pointer-events-none" />
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
  );
};
DatePicker.displayName = "DatePicker";
