"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";

export interface PartnerLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color"> {
  href: string;
  variant?: "outline" | "filled";
  color?: string;
  hoverColor?: string;
  children: React.ReactNode;
}

export function PartnerLink({
  href,
  variant = "outline",
  color,
  hoverColor,
  children,
  className,
  style,
  ...props
}: PartnerLinkProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const baseStyles =
    "px-6 py-2.5 rounded-lg font-medium inline-flex items-center justify-center gap-2 transition-colors duration-200";

  const primaryColor = color || "var(--partner-primary)";
  const primaryHoverColor = hoverColor || color || "var(--partner-primary-hover)";

  const dynamicStyles: React.CSSProperties =
    variant === "outline"
      ? {
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: primaryColor,
          backgroundColor: isHovered ? primaryColor : "transparent",
          color: isHovered ? "var(--partner-text-on-primary)" : primaryColor,
          ...style,
        }
      : {
          backgroundColor: isHovered ? primaryHoverColor : primaryColor,
          color: "var(--partner-text-on-primary)",
          ...style,
        };

  return (
    <Link
      href={href}
      className={cn(baseStyles, className)}
      style={dynamicStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </Link>
  );
}
