/**
 * Umbral mínimo de participación acumulada de accionistas (en %).
 * Mientras el total sea menor, se permite agregar más accionistas.
 */
export const SHAREHOLDING_THRESHOLD = 75;

export type ShareholderRepeaterItem = {
  shareholder_name?: string;
  shareholder_last_name?: string;
  shareholder_doc_type?: string;
  shareholder_doc_number?: string;
  shareholder_percent?: string | number;
  beneficial_owners?: string;
};

/**
 * Calcula el total de participación (%) a partir del array de accionistas.
 * Parsea cada shareholder_percent a número; valores vacíos o inválidos cuentan como 0.
 */
export function getTotalShareholding(
  repeater: ShareholderRepeaterItem[] | undefined
): number {
  if (!Array.isArray(repeater) || repeater.length === 0) return 0;
  return repeater.reduce((sum, item) => {
    const v = item.shareholder_percent;
    if (v === undefined || v === null || v === "") return sum;
    const n = typeof v === "string" ? Number(v) : v;
    return sum + (Number.isNaN(n) ? 0 : n);
  }, 0);
}

/** Objeto por defecto para un nuevo ítem del repeater de accionistas. */
export const DEFAULT_SHAREHOLDER_ITEM: ShareholderRepeaterItem = {
  shareholder_name: "",
  shareholder_last_name: "",
  shareholder_doc_type: "",
  shareholder_doc_number: "",
  shareholder_percent: "",
  beneficial_owners: "",
};
