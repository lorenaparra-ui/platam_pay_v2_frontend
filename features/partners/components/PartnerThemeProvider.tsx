"use client";

import { useEffect, useMemo } from "react";
import type { Partner } from "../interfaces";

interface PartnerThemeProviderProps {
  partner: Partner | null | undefined;
  children: React.ReactNode;
}

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const adjustBrightness = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const adjust = (value: number) =>
    Math.min(255, Math.max(0, Math.round(value + (255 * percent) / 100)));

  const r = adjust(rgb.r);
  const g = adjust(rgb.g);
  const b = adjust(rgb.b);

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

const getContrastColor = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#ffffff";

  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? "#0A0E27" : "#ffffff";
};

export function PartnerThemeProvider({
  partner,
  children,
}: PartnerThemeProviderProps) {
  const cssVariables = useMemo(() => {
    if (!partner) return null;

    const { primary_color, secondary_color, light_color } = partner;

    return {
      "--partner-primary": primary_color,
      "--partner-primary-hover": adjustBrightness(primary_color, -10),
      "--partner-primary-light": adjustBrightness(primary_color, 40),
      "--partner-secondary": secondary_color,
      "--partner-secondary-hover": adjustBrightness(secondary_color, -10),
      "--partner-light": light_color,
      "--partner-light-hover": adjustBrightness(light_color, -5),
      "--partner-text-on-primary": getContrastColor(primary_color),
      "--partner-text-on-light": getContrastColor(light_color),
    };
  }, [partner]);

  useEffect(() => {
    if (!cssVariables) return;

    const root = document.documentElement;

    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    return () => {
      Object.keys(cssVariables).forEach((property) => {
        root.style.removeProperty(property);
      });
    };
  }, [cssVariables]);

  return <>{children}</>;
}
