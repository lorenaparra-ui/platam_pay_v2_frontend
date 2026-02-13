import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"
import { Button, type ButtonProps } from "@/components/transversal/buttons/Button"

const cardVariants = cva(
  "rounded-xl border shadow-sm transition-colors bg-white dark:bg-gray-900",
  {
    variants: {
      layout: {
        vertical: "flex flex-col p-6",
        horizontal: "flex flex-row items-center p-6 gap-4",
      },
    },
    defaultVariants: {
      layout: "vertical",
    },
  }
)

export interface InformationCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title: string
  description?: string
  icon?: React.ElementType
  iconColor?: string
  iconBackgroundColor?: string
  iconBorderColor?: string
  borderColor?: string
  buttonProps?: ButtonProps & { label?: string; text?: string }
  titleClassName?: string
  descriptionClassName?: string
  iconWrapperClassName?: string
  iconClassName?: string
}

const InformationCard = React.forwardRef<HTMLDivElement, InformationCardProps>(
  (
    {
      className,
      layout,
      title,
      description,
      icon: Icon,
      iconColor = "text-primary-foreground",
      iconBackgroundColor = "bg-primary",
      iconBorderColor,
      borderColor = " dark:border-primary border-light-800",
      buttonProps,
      titleClassName,
      descriptionClassName,
      iconWrapperClassName,
      iconClassName,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ layout, className }),
          borderColor
        )}
        {...props}
      >
        {/* Icon Section */}
        {Icon && (
          <div
            className={cn(
              "flex items-center justify-center rounded-lg font-bold shrink-0",
              layout === "vertical" ? "h-12 w-12 mb-4" : "h-12 w-12",
              iconBackgroundColor,
              iconColor,
              iconBorderColor && `border ${iconBorderColor}`,
              iconWrapperClassName
            )}
          >
            <Icon className={cn("h-6 w-6", iconClassName)} />
          </div>
        )}

        {/* Content Section */}
        <div className={cn("flex-1 space-y-1", layout === "vertical" ? "" : "min-w-0")}>
          <h3 className={cn("font-semibold text-lg", titleClassName)}>{title}</h3>
          {description && (
            <p className={cn("text-sm opacity-80", descriptionClassName)}>{description}</p>
          )}
        </div>

        {/* Button Section or Children */}
        {(buttonProps || children) && (
          <div className={cn("shrink-0", layout === "vertical" ? "mt-4" : "ml-4")}>
            {buttonProps ? (
              <Button {...buttonProps}>
                {buttonProps.label || buttonProps.text || "Action"}
              </Button>
            ) : (
              children
            )}
          </div>
        )}
      </div>
    )
  }
)
InformationCard.displayName = "InformationCard"

export { InformationCard }