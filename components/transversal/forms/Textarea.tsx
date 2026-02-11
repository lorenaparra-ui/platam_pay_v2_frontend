import * as React from "react"
import { cn } from "@/lib/utils/cn"
import { inputVariants } from "./Input"
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form"
import { VariantProps } from "class-variance-authority"

export interface TextareaProps<T extends FieldValues>
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "defaultValue">,
  VariantProps<typeof inputVariants> {
  name: Path<T>
  control: Control<T>
  label: string
  rules?: RegisterOptions<T>
}

export const Textarea = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  className,
  variant,
  ...props
}: TextareaProps<T>) => {
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
            <textarea
              id={name}
              className={cn(
                inputVariants({ variant: fieldState.error ? "error" : variant }),
                "flex min-h-[80px] w-full py-2",
                className
              )}
              {...field}
              value={field.value ?? ""}
              {...props}
            />

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
Textarea.displayName = "Textarea"

