import { partnerClient } from "@/infrastructure/api/partner-client";

export const transversalService = {
  getAllCities: (CountryId: number) => [{ value: "BOGOTA", label: "BOGOTA" },
  { value: "MEDELLIN", label: "MEDELLIN" },
  { value: "CALI", label: "CALI" },
  { value: "BARRANQUILLA", label: "BARRANQUILLA" }],
  getAllDocumentTypes: () => [{ value: "CC", label: "Cédula de Ciudadanía" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "RC", label: "Registro Civil" }],
  getAllBusinessTypes: () => [{ value: "Venta Online", label: "Venta Online" },
  { value: "Comercio Físico", label: "Comer cio Físico" },
  { value: "Servicios", label: "Servicios" }], 
  getAllBusinessSeniority: () => [{ value: "Menos de 1 año", label: "Menos de 1 año" },
  { value: "1 a 2 años", label: "1 a 2 años" },
  { value: "2 a 5 años", label: "2 a 5 años" },
  { value: "Más de 5 años", label: "Más de 5 años" }]
}