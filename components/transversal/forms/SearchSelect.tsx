import { SearchOption, FormField } from '@/interfaces/form';
import { Control, Controller, FieldValues, Path, useWatch } from 'react-hook-form';
import { useRef, useEffect, useState } from "react";
import { useWordFilter } from "@lib/hooks/useWordFilter"

export interface SearchSelectProps<T extends FieldValues>
    extends Pick<FormField<T>, 'label' | 'placeholder' | 'className' | 'dependency' | 'dependencyValue' | 'rules'> {
    name: Path<T>;
    control: Control<T>;
    items: SearchOption[];
    initialValue?: string;
    onSelect?: (item: SearchOption) => void;
}


export const SearchSelect = <T extends FieldValues>({
    name,
    control,
    items,
    label,
    placeholder = 'Buscar...',
    className = '',
    initialValue = '',
    dependency,
    dependencyValue,
    rules,
    onSelect,
}: SearchSelectProps<T>) => {
    const [searchTerm, setSearchTerm] = useState(initialValue);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Dependencia condicional
    const depCurrent = dependency ? useWatch({ control, name: dependency }) : undefined;
    if (dependency && depCurrent !== dependencyValue) {
        return null;
    }

    const filteredItems = useWordFilter(items, searchTerm, 'label');

    const handleSelectItem = (item: SearchOption, onChange: (value: unknown) => void) => {
        setSearchTerm(item.label);
        onChange(item.value);     // Actualiza el valor del formulario (guarda item.value)
        if (onSelect) onSelect(item);
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <div className={`relative w-full ${className}`} ref={wrapperRef}>
                    {label && (
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                            {label}
                        </label>
                    )}
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white outline-none transition-all shadow-sm"
                            placeholder={placeholder}
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setIsOpen(true);
                            }}
                            onFocus={() => setIsOpen(true)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {isOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {filteredItems?.length > 0 ? (
                                <ul className="py-1">
                                    {filteredItems?.map((item) => (
                                        <li
                                            key={item.id}
                                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-700 dark:text-gray-200 transition-colors"
                                            onClick={() => handleSelectItem(item, field.onChange)}
                                        >
                                            {item.label}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                                    No se encontraron resultados
                                </div>
                            )}
                        </div>
                    )}

                    {fieldState.error && (
                        <p className="text-sm text-red-400 dark:text-red-400 mt-1">
                            {fieldState.error.message}
                        </p>
                    )}
                </div>
            )}
        />
    );
};