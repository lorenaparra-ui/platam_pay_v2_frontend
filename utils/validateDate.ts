/**
 * Parsea una fecha en formato YYYY-MM-DD asegurando que se interprete en la zona horaria local.
 * Evita el problema de que new Date("YYYY-MM-DD") se interprete como UTC (lo que puede restar un día).
 */
export const parseLocalDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
};

/**
 * Valida si una fecha dada (en string YYYY-MM-DD) se encuentra dentro de un rango de fechas.
 * Normaliza las horas a 00:00:00 para comparar solo las fechas.
 * 
 * @param dateString Fecha a validar (YYYY-MM-DD)
 * @param minDate Fecha mínima permitida (opcional)
 * @param maxDate Fecha máxima permitida (opcional)
 * @returns true si la fecha está dentro del rango (inclusivo), false en caso contrario.
 */
export const isDateInRange = (dateString: string, minDate?: Date, maxDate?: Date): boolean => {
    if (!dateString) return false;
    
    const date = parseLocalDate(dateString);
    
    // Función auxiliar para normalizar fecha (quitar horas)
    const normalize = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    
    const targetDate = normalize(date);

    if (minDate) {
        const min = normalize(minDate);
        if (targetDate < min) return false;
    }

    if (maxDate) {
        const max = normalize(maxDate);
        if (targetDate > max) return false;
    }

    return true;
};