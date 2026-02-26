/**
 * Convierte un string en camelCase a snake_case.
 * Ej: "clrDocNumber" -> "clr_doc_number"
 * Keys que ya están en snake_case no se alteran.
 */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Convierte recursivamente todas las claves de un objeto a snake_case.
 * Arrays: se procesan sus elementos; primitivos y File se mantienen.
 * Objeto plano: cada key se convierte a snake_case.
 */
export function keysToSnakeCase<T>(value: T): T {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof File !== "undefined" && value instanceof File) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => keysToSnakeCase(item)) as T;
  }

  if (typeof value === "object" && value.constructor === Object) {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      const snakeKey = camelToSnake(k);
      result[snakeKey] = keysToSnakeCase(v);
    }
    return result as T;
  }

  return value;
}
