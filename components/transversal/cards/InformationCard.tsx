import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"
import { Button, type ButtonProps } from "@/components/transversal/buttons/Button"

const cardVariants = cva(
  "rounded-xl border shadow-sm transition-all duration-200 bg-white dark:bg-dark-900",
  {
    variants: {
      layout: {
        vertical: "flex flex-col p-6",
        horizontal: "flex flex-row items-center p-6 gap-4",
      },
      variant: {
        default: "border-light-800 dark:border-dark-700",
        partner: "border-light-800 dark:border-dark-700",
      },
    },
    defaultVariants: {
      layout: "vertical",
      variant: "default",
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
  usePartnerColors?: boolean
}

const InformationCard = React.forwardRef<HTMLDivElement, InformationCardProps>(
  (
    {
      className,
      layout,
      variant,
      title,
      description,
      icon: Icon,
      iconColor = "text-primary-foreground",
      iconBackgroundColor = "bg-primary",
      iconBorderColor,
      borderColor,
      buttonProps,
      titleClassName,
      descriptionClassName,
      iconWrapperClassName,
      iconClassName,
      usePartnerColors = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseEnter = React.useCallback(() => {
      if (usePartnerColors && cardRef.current) {
        const hoverColor = getComputedStyle(cardRef.current).getPropertyValue("--hover-border-color").trim() || "var(--partner-primary)";
        cardRef.current.style.borderColor = hoverColor;
        cardRef.current.style.boxShadow = `0 4px 20px color-mix(in srgb, ${hoverColor} 20%, transparent)`;
      }
    }, [usePartnerColors]);

    const handleMouseLeave = React.useCallback(() => {
      if (usePartnerColors && cardRef.current) {
        cardRef.current.style.borderColor = "";
        cardRef.current.style.boxShadow = "";
      }
    }, [usePartnerColors]);

    React.useImperativeHandle(ref, () => cardRef.current!);

    const getIconStyles = React.useCallback((): React.CSSProperties => {
      if (!usePartnerColors) return {};
      
      const hoverColor = style?.["--hover-border-color" as keyof typeof style] as string | undefined;
      return {
        backgroundColor: hoverColor || "var(--partner-primary)",
        color: "var(--partner-text-on-primary)",
      };
    }, [usePartnerColors, style]);

    const iconStyles = getIconStyles();

    return (
      <div
        ref={cardRef}
        className={cn(
          cardVariants({ layout, variant, className }),
          borderColor
        )}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Icon Section */}
        {Icon && (
          <div
            className={cn(
              "flex items-center justify-center rounded-lg font-bold shrink-0",
              layout === "vertical" ? "h-12 w-12 mb-4" : "h-12 w-12",
              !usePartnerColors && iconBackgroundColor,
              !usePartnerColors && iconColor,
              iconBorderColor && `border ${iconBorderColor}`,
              iconWrapperClassName
            )}
            style={iconStyles}
          >
            <Icon className={cn("h-6 w-6", iconClassName)} />
          </div>
        )}

        {/* Content Section */}
        <div className={cn("flex-1 space-y-1", layout === "vertical" ? "" : "min-w-0")}>
          <h3 className={cn("font-semibold text-lg text-light-50 dark:text-white", titleClassName)}>{title}</h3>
          {description && (
            <p className={cn("text-sm text-light-100 dark:text-dark-300", descriptionClassName)}>{description}</p>
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