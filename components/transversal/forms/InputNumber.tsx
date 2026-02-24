import { useRef, useCallback, FocusEvent, KeyboardEvent, ChangeEvent } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"
import { Control, Controller, FieldValues } from "react-hook-form"
import { FormField } from "@/interfaces/form"

// ─── Variants (inherited from Input) ───────────────────────────────────────────

const inputVariants = cva(
  "flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:text-slate-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border-slate-200 focus-visible:ring-primary-400/50 focus-visible:border-primary-400 dark:border-slate-800 dark:focus-visible:border-primary-400",
        error:
          "border-red-500 focus-visible:ring-red-500/30 text-red-600 placeholder:text-red-300 dark:border-red-300 dark:text-red-400 dark:placeholder:text-red-400",
        success:
          "border-green-500 focus-visible:ring-green-500/30 text-green-600 dark:border-green-500 dark:text-green-400",
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

// ─── Types ──────────────────────────────────────────────────────────────────────

export type InputNumberProps<T extends FieldValues> = Omit<FormField<T>, "control"> & {
  control: Control<T>
  /** BCP 47 locale tag used by Intl.NumberFormat, e.g. "en-US", "es-CO", "fr-FR" */
  numberFormatLocale?: string
  /** Allow only integers (no decimal input). Default: false */
  integerOnly?: boolean
  /** Show thousands separator. Default: true */
  useGrouping?: boolean
  /** Minimum number of fraction digits shown */
  minFractionDigits?: number
  /** Maximum number of fraction digits allowed */
  maxFractionDigits?: number
  /** Minimum allowed numeric value */
  min?: number
  /** Maximum allowed numeric value */
  max?: number
  /** Visual prefix displayed inside the input (e.g. "$", "€") */
  prefix?: string
  /** Visual suffix displayed inside the input (e.g. "%", "kg") */
  suffix?: string
  /** Extra class on the outer wrapper */
  wrapperClassName?: string
} & VariantProps<typeof inputVariants>

// ─── Pure formatting utilities (no hooks) ──────────────────────────────────────

function buildFormatter(
  locale: string,
  {
    useGrouping = true,
    minFractionDigits,
    maxFractionDigits,
    integerOnly,
  }: {
    useGrouping?: boolean
    minFractionDigits?: number
    maxFractionDigits?: number
    integerOnly?: boolean
  }
): Intl.NumberFormat {
  const fractionMin = integerOnly ? 0 : (minFractionDigits ?? 0)
  const fractionMax = integerOnly ? 0 : (maxFractionDigits ?? 20)
  return new Intl.NumberFormat(locale, {
    useGrouping,
    minimumFractionDigits: fractionMin,
    maximumFractionDigits: fractionMax,
  })
}

function getDecimalSeparator(locale: string): string {
  return (
    new Intl.NumberFormat(locale).formatToParts(1.1).find((p) => p.type === "decimal")?.value ??
    "."
  )
}

function stripFormatting(raw: string, decimalSep: string, integerOnly: boolean): string {
  const escapedSep = decimalSep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  if (integerOnly) return raw.replace(/[^0-9\-]/g, "")
  let cleaned = raw.replace(new RegExp(`[^0-9\\-${escapedSep}]`, "g"), "")
  if (decimalSep !== ".") cleaned = cleaned.replace(new RegExp(escapedSep, "g"), ".")
  return cleaned
}

function formatNumber(value: number | null | undefined, formatter: Intl.NumberFormat): string {
  if (value === null || value === undefined || Number.isNaN(value)) return ""
  return formatter.format(value)
}

function parseDisplay(raw: string, decimalSep: string, integerOnly: boolean): number {
  const stripped = stripFormatting(raw, decimalSep, integerOnly)
  if (stripped === "" || stripped === "-") return NaN
  return parseFloat(stripped)
}

function restoreCursor(
  el: HTMLInputElement,
  prevRaw: string,
  nextRaw: string,
  prevCursor: number
) {
  let digitsBefore = 0
  for (let i = 0; i < prevCursor && i < prevRaw.length; i++) {
    if (/\d/.test(prevRaw[i])) digitsBefore++
  }
  let digitsFound = 0
  let newCursor = nextRaw.length
  for (let i = 0; i < nextRaw.length; i++) {
    if (digitsFound === digitsBefore) { newCursor = i; break }
    if (/\d/.test(nextRaw[i])) digitsFound++
  }
  requestAnimationFrame(() => el.setSelectionRange(newCursor, newCursor))
}

// ─── Component ─────────────────────────────────────────────────────────────────

const InputNumber = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  className,
  variant,
  inputSize,
  wrapperClassName,
  numberFormatLocale = "en-US",
  integerOnly = false,
  useGrouping = true,
  minFractionDigits,
  maxFractionDigits,
  min,
  max,
  prefix,
  suffix,
  ...restFormField
}: InputNumberProps<T>) => {
  const {
    defaultValue,
    dependency,
    dependencyValue,
    numberFormatOptions,
    optionsName,
    ...htmlProps
  } = restFormField as any

  const inputRef = useRef<HTMLInputElement | null>(null)
  const prefixRef = useRef<HTMLSpanElement | null>(null)
  const suffixRef = useRef<HTMLSpanElement | null>(null)

  const formatter = buildFormatter(numberFormatLocale, {
    useGrouping,
    minFractionDigits,
    maxFractionDigits,
    integerOnly,
  })
  const decimalSep = getDecimalSeparator(numberFormatLocale)

  const getPaddingStyle = useCallback((): React.CSSProperties => {
    const pl =
      prefix && prefixRef.current ? prefixRef.current.offsetWidth + 18 : undefined
    const pr =
      suffix && suffixRef.current ? suffixRef.current.offsetWidth + 12 : undefined
    return {
      ...(pl !== undefined ? { paddingLeft: pl } : {}),
      ...(pr !== undefined ? { paddingRight: pr } : {}),
    }
  }, [prefix, suffix])
  const mergedRules = {
    ...rules,
    validate: {
      ...(typeof rules?.validate === "object" ? rules.validate : {}),
      ...(rules?.validate && typeof rules.validate === "function"
        ? { _custom: rules.validate }
        : {}),
      ...(min !== undefined
        ? {
            min: (v: number) =>
              v === null || v === undefined || v >= min ||
              `Minimum value is ${formatNumber(min, formatter)}`,
          }
        : {}),
      ...(max !== undefined
        ? {
            max: (v: number) =>
              v === null || v === undefined || v <= max ||
              `Maximum value is ${formatNumber(max, formatter)}`,
          }
        : {}),
    },
  }

  return (
    <div className={cn("mb-4", wrapperClassName)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
        >
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={mergedRules}
        render={({ field, fieldState }) => {
          const numericValue: number | null =
            field.value !== undefined &&
            field.value !== null &&
            !Number.isNaN(Number(field.value))
              ? Number(field.value)
              : null

          const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            const el = e.target
            const raw = el.value
            const cursor = el.selectionStart ?? raw.length
            const stripped = stripFormatting(raw, decimalSep, integerOnly)
            const parsed =
              stripped === "" || stripped === "-" ? null : parseFloat(stripped)

            let nextDisplay: string
            if (
              stripped === "" ||
              stripped === "-" ||
              stripped === "." ||
              stripped === "-."
            ) {
              nextDisplay = raw
            } else if (parsed !== null && !Number.isNaN(parsed)) {
              nextDisplay = formatter.format(parsed)
            } else {
              nextDisplay = raw
            }

            field.onChange(parsed !== null && !Number.isNaN(parsed) ? parsed : null)

            requestAnimationFrame(() => {
              if (inputRef.current) {
                inputRef.current.value = nextDisplay
                restoreCursor(inputRef.current, raw, nextDisplay, cursor)
              }
            })
          }

          const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
            const raw = e.target.value
            const parsed = parseDisplay(raw, decimalSep, integerOnly)
            let finalValue: number | null = Number.isNaN(parsed) ? null : parsed

            if (finalValue !== null) {
              if (min !== undefined && finalValue < min) finalValue = min
              if (max !== undefined && finalValue > max) finalValue = max
            }

            field.onChange(finalValue)

            if (inputRef.current) {
              inputRef.current.value =
                finalValue !== null ? formatNumber(finalValue, formatter) : ""
            }

            field.onBlur()
          }

          const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            const el = e.currentTarget
            const allowedKeys = new Set([
              "Backspace", "Delete", "Tab", "Escape", "Enter",
              "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
              "Home", "End",
            ])

            if (e.ctrlKey || e.metaKey) return
            if (allowedKeys.has(e.key)) return

            if (e.key === "-") {
              const atStart = el.selectionStart === 0
              const noExistingMinus = !el.value.startsWith("-")
              const minAllowed = min === undefined || min < 0
              if (atStart && noExistingMinus && minAllowed) return
              e.preventDefault()
              return
            }

            if (e.key === decimalSep || (decimalSep !== "." && e.key === ".")) {
              if (integerOnly) { e.preventDefault(); return }
              if (el.value.includes(decimalSep)) { e.preventDefault(); return }
              return
            }

            if (/^\d$/.test(e.key)) return
            e.preventDefault()
          }

          return (
            <>
              <div className="relative flex items-center">
                {prefix && (
                  <span
                    ref={prefixRef}
                    className={cn(
                      "pointer-events-none absolute left-0 flex items-center ml-4  select-none",
                      "text-sm text-slate-500 dark:text-slate-400",
                      fieldState.error && "text-red-400 dark:text-red-400"
                    )}
                  >
                    {prefix}
                  </span>
                )}

                <input
                  id={name}
                  type="text"
                  inputMode={integerOnly ? "numeric" : "decimal"}
                  autoComplete="off"
                  ref={(el) => {
                    inputRef.current = el
                    if (typeof field.ref === "function") field.ref(el)
                    else if (field.ref) (field.ref as any).current = el
                  }}
                  name={field.name}
                  defaultValue={
                    numericValue !== null ? formatNumber(numericValue, formatter) : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  style={getPaddingStyle()}
                  className={cn(
                    inputVariants({
                      variant: fieldState.error ? "error" : variant,
                      inputSize,
                      className,
                    }),
                    suffix && "pr-10",
                    prefix && "pl-10"
                  )}
                  {...htmlProps}
                />

                {suffix && (
                  <span
                    ref={suffixRef}
                    className={cn(
                      "pointer-events-none absolute right-0 flex items-center pr-3 select-none",
                      "text-sm text-slate-500 dark:text-slate-400",
                      fieldState.error && "text-red-400 dark:text-red-400"
                    )}
                  >
                    {suffix}
                  </span>
                )}
              </div>

              {fieldState.error && (
                <p className="text-sm text-red-400 mt-1">{fieldState.error.message}</p>
              )}
            </>
          )
        }}
      />
    </div>
  )
}

InputNumber.displayName = "InputNumber"

export { InputNumber, inputVariants }