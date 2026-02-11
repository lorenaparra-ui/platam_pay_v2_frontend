import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 active:scale-95 duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 border border-primary ligth:text-primary-foreground hover:bg-primary-600 hover:shadow-primary dark:border dark:border-secondary-400  dark:hover:bg-primary-500",
        secondary:
          "border-2 border-secondary-500 text-secondary-600 hover:bg-secondary-400/10 active:bg-secondary-400/20 dark:border-secondary-400 dark:text-secondary-400 dark:hover:bg-secondary-400/10 dark:active:bg-secondary-400/20",
        ghost:
          "text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 font-medium bg-transparent hover:bg-transparent shadow-none",
        theme:
          "bg-slate-950 text-white hover:bg-slate-900 shadow-lg dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200",
      },
      size: {
        default: "h-[44px] px-6 py-2.5",
        sm: "h-9 rounded-md px-3",
        lg: "h-[52px] px-8 py-4 text-base",
        icon: "h-10 w-10 rounded-full p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }