import {  SectionInformationField } from "@/interfaces/section"


export const defaultValuesLegalEntity = {
    "pa_id": "",
    "clr_cp_id": "",
    "clr_hunter_id": "",
    "clr_requested_loc": "",
    "Show_cupo": "",
    "clr_first_name": "",
    "clr_doc_number": "",
    "clr_city": "",
    "clr_bus_address": "",
    "clr_email": "",
    "clr_pj_year_of_establishment": "",
    "clr_pj_legal_rep_name": "",
    "clr_pj_legal_rep_last_name": "",
    "clr_pj_legal_rep_doc_type": "",
    "clr_pj_legal_rep_doc_number": "",
    "clr_phone": "",
    "direccion_del_representante_legal": "",
    "clr_bus_name": "",
    "clr_bus_type": "",
    "clr_bus_seniority": "",
    "clr_bus_num_locations": "",
    "clr_bus_num_employees": "",
    "clr_bus_flagship_m2": "",
    "clr_has_rent": "",
    "clr_rent": "",
    "show_assets": "",
    "clr_bus_total_assets": "",
    "show_income": "",
    "clr_bus_monthly_income": "",
    "show_exp": "",
    "clr_bus_monthly_expenses": "",
    "alias": "",
    "clr_bus_is_client": "",
    "show_mothly_purchases": "",
    "clr_bus_monthly_purchases": "",
    "show_mothly_purchases_copy": "",
    "clr_bus_current_purchases": "",
    "clr_pj_shareholders_repeater": [
        {
            "shareholder_name": "",
            "shareholder_last_name": "",
            "shareholder_doc_type": "",
            "shareholder_doc_number": "",
            "shareholder_percent": "",
            "beneficial_owners": ""
        }
    ],
    "clr_pj_eeff": {
        "id": "",
        "url": ""
    },
    "autoriz": "",
    "__form_id": "",
    "__refer": "",
    "__is_ajax": ""
}

export const legalEntityFormFields:SectionInformationField[]  = [
    
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
    // Solicitud
    {
        section: "Solicitud",
        fields: [{
            name: "clr_requested_loc",
            label: "¿Qué cupo de línea de crédito necesitas para tu negocio?",
            typefield: "input",
            type: "number",
            placeholder: "Indica el monto sin puntos ni comas",
            rules: { required: "El monto solicitado es requerido" }
        }]
    },
    // Empresa
    {
        section: "Empresa",
        fields: [
            {
                name: "clr_first_name",
                label: "Razón Social",
                typefield: "input",
                type: "text",
                placeholder: "Ejemplo: Company S.A.S",
                rules: { required: "La Razón Social es requerida" }
            },
            {
                name: "clr_doc_number",
                label: "NIT",
                type: "text",
                typefield: "input",
                placeholder: "Sin dígito de verificación",
                rules: { required: "El NIT es requerido" }
            },
            {
                name: "clr_city",
                label: "Ciudad",
                typefield: "select",
                placeholder: "Buscar",
                optionsName: "cities",
                rules: { required: "La ciudad es requerida" }
            },
            {
                name: "clr_bus_address",
                label: "Dirección principal de la empresa",
                type: "text",
                typefield: "input",
                placeholder: "Ejemplo: Calle 123 #456",
                rules: { required: "La dirección es requerida" }
            },
            {
                name: "clr_email",
                label: "Correo electrónico de contacto",
                type: "email",
                typefield: "input",
                rules: {
                    required: "El correo es requerido",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Correo electrónico inválido"
                    }
                }
            },
            {
                name: "clr_pj_year_of_establishment",
                label: "Año de constitución",
                type: "number",
                typefield: "input",
                placeholder: "YYYY",
                rules: { required: "El año de constitución es requerido" }
            },
        ]
    },
    {
        section: "Datos del representante legal",
        fields: [
            {
                name: "clr_pj_legal_rep_name",
                label: "Nombres del representante legal",
                type: "text",
                typefield: "input",
                rules: { required: "Nombres requeridos" }
            },
            {
                name: "clr_pj_legal_rep_last_name",
                label: "Apellidos del representante legal",
                type: "text",
                typefield: "input",
                rules: { required: "Apellidos requeridos" }
            },
            {
                name: "clr_pj_legal_rep_doc_type",
                label: "Tipo de documento del representante legal",
                typefield: "select",
                optionsName: "documentTypes",
                rules: { required: "Tipo de documento requerido" }
            },
            {
                name: "clr_pj_legal_rep_doc_number",
                label: "Número de documento del representante legal",
                type: "number",
                 typefield: "input",
                rules: { required: "Número de documento requerido" }
            },
            {
                name: "clr_phone",
                label: "Número de celular del representante legal",
                type: "number",
                 typefield: "input",
                placeholder: "Sin indicativo de país",
                rules: { required: "Celular requerido" }
            },
            {
                name: "direccion_del_representante_legal",
                label: "Dirección del representante legal",
                type: "text",
                 typefield: "input",
                rules: { required: "Dirección requerida" }
            },
        ]
    },
    {
        section:"Datos del Negocio", 
        fields:[
            {
                name: "clr_bus_name",
                label: "Nombre comercial del negocio",
                type: "text",
                 typefield: "input",
                rules: { required: "Nombre comercial requerido" }
            },
            {
                name: "clr_bus_type",
                label: "Tipo de negocio",
                typefield: "select",
                optionsName: "businessTypes",
                rules: { required: "Tipo de negocio requerido" }
            },
            {
                name: "clr_bus_seniority",
                label: "Antigüedad del negocio",
                typefield: "select",
                optionsName: "businessSeniority",
                rules: { required: "Antigüedad requerida" }
            },
            {
                name: "clr_bus_num_locations",
                label: "Cantidad de locales",
                type: "number",
                 typefield: "input",
                rules: { required: "Cantidad de locales requerida" }
            },
            {
                name: "clr_bus_num_employees",
                label: "Número de empleados",
                type: "number",
                 typefield: "input",
                rules: { required: "Número de empleados requerido" }
            },
            {
                name: "clr_bus_flagship_m2",
                label: "¿Cuál es el tamaño de tu local principal? (m²)",
                type: "number",
                 typefield: "input",
                rules: { required: "Tamaño requerido" }
            },
            {
                name: "clr_has_rent",
                label: "¿Arrienda el(los) local(es) donde opera su negocio?",
                typefield: "select", // O radio si se implementa componente radio
                options: [
                    { value: "Sí", label: "Sí" },
                    { value: "No", label: "No" }
                ],
                rules: { required: "Requerido" }
            }
        ] 
    },

    
]
