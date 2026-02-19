import { useMemo } from 'react';

/**
 * Hook personalizado para filtrar un arreglo de objetos basado en una propiedad y un término de búsqueda.
 * 
 * @param items El arreglo de elementos a filtrar.
 * @param searchTerm El término de búsqueda.
 * @param key La propiedad del objeto por la cual filtrar.
 * @returns El arreglo filtrado.
 */
export function useWordFilter<T>(items: T[], searchTerm: string, key: keyof T): T[] {
    return useMemo(() => {
        if (!searchTerm) return items;

        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        return items?.filter((item) => {
            const value = item[key];
            
            // Verificación segura de nulos/indefinidos y conversión a string
            if (value === null || value === undefined) return false;

            return String(value).toLowerCase().includes(lowerCaseSearchTerm);
        });
    }, [items, searchTerm, key]);
}