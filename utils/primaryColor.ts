/**
 * Detecta si un string es una clase de color de Tailwind (text-*, bg-*, border-*).
 */
export function isTailwindColorClass(value: string): boolean {
  return /^(text|bg|border)-[\w-]+$/.test(value.trim());
}

/**
 * Extrae la parte "tema" de una clase Tailwind de color (ej. "primary-600" de "text-primary-600").
 */
function getTailwindColorSuffix(value: string): string | null {
  const match = value.trim().match(/^(?:text|bg|border)-([\w-]+)$/);
  return match ? match[1]! : null;
}

export type PrimaryColorConfig =
  | {
      type: "tailwind";
      /** Clase para background (bg-*). Aplicar solo donde corresponda fondo. */
      bgClass: string;
      /** Clase para texto (text-*). Aplicar donde corresponda color de texto. */
      textClass: string;
      /** Clase para borde (border-*). Aplicar donde corresponda borde. */
      borderClass: string;
    }
  | {
      type: "css";
      value: string;
    };

/**
 * Parsea primaryColor (clase Tailwind, var() o hex/rgb) y devuelve
 * clases Tailwind o valor CSS para usar en background, texto y borde.
 * Para Tailwind: si el valor es dinámico, considera usar safelist en tailwind.config
 * o usar variable CSS (var/hex) para evitar clases no generadas.
 */
export function getPrimaryColorConfig(primaryColor: string): PrimaryColorConfig {
  const trimmed = primaryColor.trim();
  if (isTailwindColorClass(trimmed)) {
    const suffix = getTailwindColorSuffix(trimmed);
    if (suffix) {
      return {
        type: "tailwind",
        bgClass: `bg-${suffix}`,
        textClass: `text-${suffix}`,
        borderClass: `border-${suffix}`,
      };
    }
  }
  return { type: "css", value: trimmed };
}
