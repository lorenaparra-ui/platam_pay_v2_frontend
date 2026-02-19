import { Option } from "@/interfaces/form";

/**
 * Transforma un arreglo de objetos genéricos en un arreglo de opciones { value, label }.
 * 
 * @param items Arreglo de objetos a transformar.
 * @param valueKey Nombre de la propiedad que se usará como 'value'.
 * @param labelKey Nombre de la propiedad que se usará como 'label'.
 * @returns Arreglo de objetos tipo Option.
 */
export function transformToOptions<T>(
    items: T[], 
    valueKey: keyof T, 
    labelKey: keyof T
): Option[] {
    return items.map(item => ({
        value: String(item[valueKey]),
        label: String(item[labelKey])
    }));
}