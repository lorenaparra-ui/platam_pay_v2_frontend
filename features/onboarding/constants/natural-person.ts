import { SectionInformationField } from "@/interfaces/section"

export const defaultValuesNaturalPerson={
"patner_id":"",
"patner_category_id":"",
"sales_rep_id":"",
"first_name":"",
"last_name":"",
"doc_type":"",
"doc_number":"",
"birth_date":"",
"email":"",
"phone":"",
"business_name":"",
"business_relation":"",
"business_city":"",
"business_address":"",
"business_type":"",
"business_seniority":"",
"business_number_of_employees":"",
"business_number_of_locations":"",
"business_flagship_m2":"",
"business_has_rent":"",
"business_rent_amount":"",
"show_assets":"",
"total_assets":"",
"monthly_income":"",
"monthly_expenses":"",
"is_partner_client":"",
"mothly_partner_purchases":"",
"current_purchases":"",
"clr_requested_loc":""
}

export const naturalPersonFormFields: SectionInformationField[] = [
    {
        section: "Representante de Ventas",
         fields:[
            {
                name: "clr_hunter_id",
                label: "Representante de Ventas",
                typefield: "select",
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
                typefield: "input",
                rules: { required: "Nombres requeridos" }
            },
            {
                name: "last_name",
                label: "Apellidos",
                type: "text",
                typefield: "input",
                rules: { required: "Apellidos requeridos" }
            },
            {
                name: "doc_type",
                label: "Tipo de documento",
                typefield: "select",
                optionsName: "documentTypes",
                rules: { required: "Tipo de documento requerido" }
            },
            {
                name: "doc_number",
                label: "Número de documento",
                type: "text",
                typefield: "input",
                rules: { required: "Número de documento requerido" }
            },
            {
                name: "birth_date",
                label: "Fecha de nacimiento",
                typefield: "date",
                rules: { required: "Fecha de nacimiento requerida" }
            },
            {
                name: "email",
                label: "Correo electrónico",
                type: "email",
                typefield: "input",
                rules: {
                    required: "Correo requerido",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Correo electrónico inválido"
                    }
                }
            },
            {
                name: "phone",
                label: "Número de celular",
                type: "number",
                typefield: "input",
                rules: { required: "Celular requerido" }
            }
        ]
    },
    {
        section: "Datos del Negocio",
        fields: [
            {
                name: "business_name",
                label: "Nombre del negocio",
                type: "text",
                typefield: "input",
                rules: { required: "Nombre del negocio requerido" }
            },
            {
                name: "business_relation",
                label: "¿Cuál es la relación con el negocio?",
                typefield: "select",
                options: [
                    { label: "Único dueño", value: "Unico dueño" },
                    { label: "Socio", value: "Socio" }
                ],
                rules: { required: "Relación con el negocio requerida" }
            },
            {
                name: "business_city",
                label: "Ciudad",
                typefield: "select",
                optionsName: "cities",
                placeholder: "Buscar",
                rules: { required: "Ciudad requerida" }
            },
            {
                name: "business_address",
                label: "Dirección principal del negocio",
                type: "text",
                typefield: "input",
                rules: { required: "Dirección requerida" }
            },
            {
                name: "business_type",
                label: "Tipo de negocio",
                typefield: "select",
                optionsName: "businessTypes",
                placeholder: "Buscar",
                rules: { required: "Tipo de negocio requerido" }
            },
            {
                name: "business_seniority",
                label: "Antigüedad",
                typefield: "select",
                optionsName: "businessSeniority",
                rules: { required: "Antigüedad requerida" }
            },
            {
                name: "business_number_of_employees",
                label: "Número de empleados",
                type: "number",
                typefield: "input",
                rules: { required: "Número de empleados requerido" }
            },
            {
                name: "business_number_of_locations",
                label: "Cantidad de locales",
                type: "number",
                typefield: "input",
                rules: { required: "Cantidad de locales requerida" }
            },
            {
                name: "business_flagship_m2",
                label: "¿Cuál es el tamaño de tu local principal?",
                type: "number",
                typefield: "input",
                placeholder: "En m²",
                rules: { required: "Tamaño requerido" }
            },
            {
                name: "business_has_rent",
                label: "¿Arrienda el(los) local(es) donde opera su negocio?",
                typefield: "select",
                options: [
                    { label: "Sí", value: "Si" },
                    { label: "No", value: "No" }
                ],
                rules: { required: "Requerido" }
            },
            {
                name: "total_assets",
                label: "Total de activos",
                type: "number",
                typefield: "input",
                placeholder: "$0",
                rules: { required: "Total de activos requerido" }
            },
            {
                name: "monthly_income",
                label: "Ventas mensuales",
                type: "number",     
                typefield: "input",
                placeholder: "$0",
                rules: { required: "Ventas mensuales requeridas" }
            },
            {
                name: "monthly_expenses",
                label: "Gastos mensuales en inventario",
                type: "number", 
                typefield: "input",
                placeholder: "$0",
                rules: { required: "Gastos mensuales requeridos" }
            },
            {
                name: "is_partner_client",
                label: "¿Eres cliente actual de Platam?",
                typefield: "select",
                options: [
                    { label: "Sí", value: "Si" },
                    { label: "No", value: "No" }
                ],
                rules: { required: "Requerido" }
            },
            {
                name: "clr_requested_loc",
                label: "¿Qué cupo de línea de crédito necesitas para tu negocio?",
                type: "number", 
                typefield: "input",
                placeholder: "$0",
                rules: { required: "Monto requerido" }
            }
        ]
    }
];



