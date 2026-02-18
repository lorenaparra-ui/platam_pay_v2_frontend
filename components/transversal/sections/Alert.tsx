import { ReactNode } from "react"
import { cn } from "@/lib/utils/cn"

export type AlertVariant = "primary" | "secondary" | "tertiary" | "warning"

export interface AlertProps {
  variant: AlertVariant
  title: string
  description: string
  className?: string
  icon?: ReactNode
}

const VARIANT_STYLES: Record<
  AlertVariant,
  {
    container: string
    indicator: string
    title: string
    description: string
  }
> = {
  primary: {
    // Éxito / Estado principal
    container:
      "bg-primary-50 border-primary-200 dark:bg-primary-400/10 dark:border-primary-400/30",
    indicator:
      "bg-primary-100 border-primary-300 text-primary-600 dark:bg-primary-400/20 dark:border-primary-400/60 dark:text-primary-300",
    title: "text-primary-700 dark:text-primary-300",
    description: "text-slate-600 dark:text-gray-300",
  },
  secondary: {
    // Información
    container:
      "bg-sky-50 border-sky-200 dark:bg-sky-400/10 dark:border-sky-400/30",
    indicator:
      "bg-sky-100 border-sky-300 text-sky-600 dark:bg-sky-400/20 dark:border-sky-400/60 dark:text-sky-300",
    title: "text-sky-700 dark:text-sky-300",
    description: "text-slate-600 dark:text-gray-300",
  },
  tertiary: {
    // Nota
    container:
      "bg-violet-50 border-violet-200 dark:bg-violet-400/10 dark:border-violet-400/30",
    indicator:
      "bg-violet-100 border-violet-300 text-violet-600 dark:bg-violet-400/20 dark:border-violet-400/60 dark:text-violet-300",
    title: "text-violet-700 dark:text-violet-300",
    description: "text-slate-600 dark:text-gray-300",
  },
  warning: {
    // Advertencia
    container:
      "bg-amber-50 border-amber-200 dark:bg-amber-400/10 dark:border-amber-400/30",
    indicator:
      "bg-amber-100 border-amber-300 text-amber-600 dark:bg-amber-400/20 dark:border-amber-400/60 dark:text-amber-300",
    title: "text-amber-700 dark:text-amber-300",
    description: "text-slate-700 dark:text-gray-300",
  },
}

export const Alert = ({
  variant,
  title,
  description,
  className,
  icon,
}: AlertProps) => {
  const styles = VARIANT_STYLES[variant]

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4",
        styles.container,
        className
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border text-sm shrink-0",
          styles.indicator
        )}
      >
        {icon ?? (
          <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h5 className={cn("text-sm font-semibold", styles.title)}>{title}</h5>
        <p className={cn("text-sm leading-relaxed", styles.description)}>
          {description}
        </p>
      </div>
    </div>
  )
}