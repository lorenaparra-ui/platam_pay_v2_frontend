import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form"

const inputVariants = cva(
  "flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:text-slate-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-slate-200 focus-visible:ring-primary-400/50 focus-visible:border-primary-400 dark:border-slate-800 dark:focus-visible:border-primary-400",
        error: "border-red-500 focus-visible:ring-red-500/30 text-red-600 placeholder:text-red-300 dark:border-red-500 dark:text-red-400 dark:placeholder:text-red-400",
        success: "border-green-500 focus-visible:ring-green-500/30 text-green-600 dark:border-green-500 dark:text-green-400",
      },
      inputSize: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2 text-xs",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
)

export interface InputProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue" | "size">,
    VariantProps<typeof inputVariants> {
  name: Path<T>
  control: Control<T>
  label: string
  rules?: RegisterOptions<T>
}

const Input = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  className,
  variant,
  inputSize,
  type,
  ...props
}: InputProps<T>) => {
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
            <input
              type={type}
              id={name}
              className={cn(
                inputVariants({
                  variant: fieldState.error ? "error" : variant,
                  inputSize,
                  className,
                })
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
Input.displayName = "Input"

export { Input, inputVariants }