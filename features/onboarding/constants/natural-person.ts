import { FormStep } from "@/interfaces/form";
import { FieldType } from "@/interfaces/section";
const today = new Date();
const maxAllowedDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate() - 1);

export const defaultValuesNaturalPerson = {
    "patner_id": "",
    "patner_category_id": "",
    "sales_rep_id": "",
    "first_name": "",
    "last_name": "",
    "doc_type": "",
    "doc_number": "",
    "birth_date": "",
    "email": "",
    "phone": "",
    "business_name": "",
    "business_relation": "",
    "business_city": "",
    "business_address": "",
    "business_type": "",
    "business_seniority": "",
    "business_number_of_employees": "",
    "business_number_of_locations": "",
    "business_flagship_m2": "",
    "business_has_rent": "",
    "business_rent_amount": "",
    "show_assets": "",
    "total_assets": "",
    "monthly_income": "",
    "monthly_expenses": "",
    "is_partner_client": "",
    "mothly_partner_purchases": "",
    "current_purchases": "",
    "clr_requested_loc": ""
}



export const naturalPersonFormFields: FormStep[] = [
    {
        step: 1,
        sections: [
            {
                section: "Representante de Ventas",
                columns: 1,
                name: "salesRepresentative",
                fields: [
                    {
                        name: "clr_hunter_id",
                        label: "Representante de Ventas",
                        typefield: FieldType.Select,
                        placeholder: "Selecciona uno o deja en blanco si no sabes",
                        optionsName: "salesRepresentatives",
                        rules: { required: "El representante de ventas es requerido" }

                    }
                ]
            },
            {
                section: "Datos del Cliente",
                fields: [
                    {
                        name: "first_name",
                        label: "Nombres",
                        type: "text",
                        typefield: FieldType.Input,
                        rules: { required: "Nombres requeridos" }
                    },
                    {
                        name: "last_name",
                        label: "Apellidos",
                        type: "text",
                        typefield: FieldType.Input,
                        rules: { required: "Apellidos requeridos" }
                    },
                    {
                        name: "doc_type",
                        label: "Tipo de documento",
                        typefield: FieldType.Select,
                        optionsName: "documentTypes",
                        rules: { required: "Tipo de documento requerido" }
                    },
                    {
                        name: "doc_number",
                        label: "Número de documento",
                        type: "text",
                        typefield: FieldType.Input,
                        rules: {
                            required: "Número de documento requerido",
                            minLength: { value: 7, message: "Debe tener mínimo 7 caracteres" }
                        }
                    },
                    {
                        name: "birth_date",
                        label: "Fecha de nacimiento",
                        typefield: FieldType.Date,
                        maxDate: maxAllowedDate,
                        rules: {
                            required: "Fecha de nacimiento requerida",

                        }
                    },
                    {
                        name: "email",
                        label: "Correo electrónico",
                        type: "email",
                        typefield: FieldType.Input,
                        rules: {
                            required: "Correo requerido",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Correo electrónico inválido"
                            }
                        }
                    },
                    {
                        name: "phone_code",
                        label: "País / Número de celular",
                        type: "number",
                        typefield: FieldType.InputWithSelect,
                        optionsName: "phoneCodes",
                        labelKey: "label",
                        valueKey: "value",
                        imageKey: "flag",
                        defaultSelectValue: "57",
                        rules: { required: "Código de país requerido" }
                    },
                ]
            },
        ]
    },
    {
        step: 2,
        sections: [
            {
                section: "Datos del Negocio",
                fields: [
                    {
                        name: "business_name",
                        label: "Nombre del negocio",
                        type: "text",
                        typefield: FieldType.Input,
                        rules: {
                            required: "Nombre del negocio requerido",
                            minLength: { value: 3, message: "Debe tener mínimo 3 caracteres" }
                        }
                    },
                    {
                        name: "business_relation",
                        label: "¿Cuál es la relación con el negocio?",
                        typefield: FieldType.Select,
                        options: [
                            { label: "Único dueño", value: "Unico dueño" },
                            { label: "Socio", value: "Socio" },
                            { label: "Empleado", value: "Empleado" },
                            { label: "Familiar del dueño", value: "Familiar del dueño" }
                        ],
                        rules: { required: "Relación con el negocio requerida" }
                    },
                    {
                        name: "business_city",
                        label: "Ciudad",
                        typefield: FieldType.Select,
                        optionsName: "cities",
                        placeholder: "Buscar",
                        rules: { required: "Ciudad requerida" }
                    },
                    {
                        name: "business_address",
                        label: "Dirección principal del negocio",
                        type: "text",
                        typefield: FieldType.Input,
                        rules: { required: "Dirección requerida" }
                    },
                    {
                        name: "business_type",
                        label: "Tipo de negocio",
                        typefield: FieldType.SearchSelect,
                        optionsName: "businessTypes",
                        placeholder: "Buscar",
                        //rules: { required: "Tipo de negocio requerido" }
                    },
                    {
                        name: "business_seniority",
                        label: "Antigüedad",
                        typefield: FieldType.Select,
                        optionsName: "businessSeniority",
                        rules: { required: "Antigüedad requerida" }
                    },
                    {
                        name: "business_number_of_employees",
                        label: "Número de empleados",
                        type: "number",
                        typefield: FieldType.Input,
                        rules: { required: "Número de empleados requerido" }
                    },
                    {
                        name: "business_number_of_locations",
                        label: "Cantidad de locales",
                        type: "number",
                        typefield: FieldType.Input,
                        rules: { required: "Cantidad de locales requerida" }
                    },
                    {
                        name: "business_flagship_m2",
                        label: "¿Cuál es el tamaño de tu local principal?",
                        type: "number",
                        typefield: FieldType.Input,
                        placeholder: "En m²",
                        rules: { required: "Tamaño requerido" }
                    },
                    {
                        name: "business_has_rent",
                        label: "¿Arrienda el(los) local(es) donde opera su negocio?",
                        typefield: FieldType.Select,
                        options: [
                            { label: "Sí", value: "Si" },
                            { label: "No", value: "No" }
                        ],
                        rules: { required: "Requerido" }
                    },
                    {
                        name: "business_rent_amount",
                        label: "Valor mensual total de arriendos",
                        typefield: FieldType.InputNumber,
                        integerOnly: true,
                        useGrouping: true,
                        numberFormatLocale:'es-CO',
                        prefix:'$',
                        max:100000,
                        dependency: "business_has_rent",
                        dependencyValue: "Si",
                        rules: { required: "Monto requerido" }
                    },
                ]
            }
        ]
    },
    {
        step: 3,
        sections: [
            {
                section: "Información de financiera",
                fields: [
                    {
                        name: "total_assets",
                        label: "Total de activos",
                        type: "number",
                        typefield: FieldType.Input,
                        placeholder: "$0",
                        rules: { required: "Total de activos requerido" }
                    },
                    {
                        name: "monthly_income",
                        label: "Ventas mensuales",
                        type: "number",
                        typefield: FieldType.Input,
                        placeholder: "$0",
                        rules: { required: "Ventas mensuales requeridas" }
                    },
                    {
                        name: "monthly_expenses",
                        label: "Gastos mensuales en inventario",
                        type: "number",
                        typefield: FieldType.Input,
                        placeholder: "$0",
                        rules: { required: "Gastos mensuales requeridos" }
                    },
                    {
                        name: "clr_requested_loc",
                        label: "¿Qué cupo de línea de crédito necesitas para tu negocio?",
                        type: "number",
                        typefield: FieldType.Input,
                        placeholder: "$0",
                        rules: { required: "Monto requerido" }
                    },
                    {
                        name: "is_partner_client",
                        label: "¿Eres cliente actual de Platam?",
                        typefield: FieldType.Select,
                        options: [
                            { label: "Sí", value: "Si" },
                            { label: "No", value: "No" }
                        ],
                        rules: { required: "Requerido" }
                    },
                    {
                        name: "mothly_partner_purchases",
                        label: "¿Cuánto sueles comprar mensualmente?",
                        type: "number",
                        numberFormatLocale: "es-CO",
                        numberFormatOptions: { style: "currency", currency: "COP", maximumFractionDigits: 0 },
                        dependency: "is_partner_client",
                        dependencyValue: "Si",
                        typefield: FieldType.Input,
                        rules: { required: "Monto requerido" }
                    }
                ]
            }
        ]

    }
];
