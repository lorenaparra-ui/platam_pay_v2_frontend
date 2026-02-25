/**
 * Resultado de consulta de información empresarial por NIT (RUT/identificación tributaria).
 * Usado por el servicio de información empresarial y el user-client.
 */
export interface BusinessInfoResult {
  name: string;
  nit: string;
  category: string;
  status: string;
  primaryLegalePresentative: {
    name: string;
    docType: string;
    docNumber: string;
  };
  tipoSociedad: string;
  tipoOrganizacion: string;
  fechaRenovacion: string;
}

/**
 * Respuesta del backend al consultar información empresarial por NIT.
 */
export interface BusinessInfoResponse {
  success: boolean;
  results: BusinessInfoResult[];
}
