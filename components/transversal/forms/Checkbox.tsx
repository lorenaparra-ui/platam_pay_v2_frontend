import * as React from "react"
import { Check } from "lucide-react"

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        className="peer h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-slate-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary-400 checked:border-primary-400 dark:border-slate-600 dark:bg-slate-950 dark:checked:bg-primary-400 dark:checked:border-primary-400"
        ref={ref}
        {...props}
      />
      <Check className="absolute left-0 top-0 h-4 w-4 hidden peer-checked:block text-white pointer-events-none" strokeWidth={3} />
    </div>
  )
})
Checkbox.displayName = "Checkbox"
