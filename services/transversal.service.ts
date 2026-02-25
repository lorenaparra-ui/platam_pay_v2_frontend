import ciiuCodes from "../constants/ciiu-codes.json";
import { transversalClient } from "@/infrastructure/api/transversal-client";
import { CitiesResponse, parseCitiesToOptions } from "@/schemas/transversal.schema";
import type { Option } from "@/interfaces/form";

const flattenedCiiuCodes = ciiuCodes.secciones.flatMap(seccion => 
  seccion.divisiones.flatMap(division => 
    division.grupos.flatMap(grupo => 
      grupo.clases.map(clase => ({
        codigo: clase.codigo,
        descripcion: clase.descripcion
      }))
    )
  )
);

export const transversalService = {
  getCiiuCodes: (search: string | number) => {
    const searchTerm = String(search).toLowerCase();
    return flattenedCiiuCodes
      .filter(item => 
        item.codigo.toLowerCase().includes(searchTerm) || 
        item.descripcion.toLowerCase().includes(searchTerm)
      )
      .map(item => ({
        value: item.codigo,
        label: `${item.codigo} - ${item.descripcion}`
      }));
  },
  getAllCiiuCodes: () => {
    return flattenedCiiuCodes.map(item => ({
      id: item.codigo,
      label: `${item.codigo} - ${item.descripcion}`,
      value: item.codigo
    }));
  },
  getAllCities: async (): Promise<Option[]> => {
    const data = await transversalClient.get<CitiesResponse>("/transversal/cities");
    return parseCitiesToOptions(data);
  },
  getAllDocumentTypes: () => [{ value: "CC", label: "Cédula de Ciudadanía" },
  { value: "CE", label: "Cédula de Extranjería" },
  ],
  
  getAllBusinessSeniority: () => [{ value: "Menos de 1 año", label: "Menos de 1 año" },
  { value: "1 a 2 años", label: "1 a 2 años" },
  { value: "2 a 5 años", label: "2 a 5 años" },
  { value: "Más de 5 años", label: "Más de 5 años" }]
  
}