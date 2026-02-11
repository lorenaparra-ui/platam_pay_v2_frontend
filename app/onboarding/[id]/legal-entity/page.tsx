"use client"
import { CreditaApplicationForm } from "@/features/onboarding/components/credit -application/CreditaApplicationForm";
import { defaultValuesLegalEntity, legalEntityFormFields } from "@onboarding/constants/legal-entity";
import { legalEntitySchema } from "@/features/onboarding/schemas/legal-entity-schema";
import { salesRepresentativeService } from "@/features/partners/services/sales-representative";
import { useConfigData } from "@/providers/ConfigDataProvider";
import React, { useEffect, useState } from "react";
import { LegalEntityOptions } from "@/features/onboarding/interfaces/legal-entity";


const handleSubmit = async (data: any) => {
    try {

    } catch (error) {

    }
}


export default function LegalEntityPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const { documentTypes, businessTypes, businessSeniority, cities } = useConfigData();
    const [salesRepresentatives, setSalesRepresentatives] = useState<any[]>([]);
    
    useEffect(() => {
        if (id) {
            const reps = salesRepresentativeService.getAllByPartner(Number(id));
            setSalesRepresentatives(reps);
        }
    }, [id]);

    const options: Record<string, any[]> = {
        salesRepresentatives,
        documentTypes,
        businessTypes,
        businessSeniority,
        cities,
    };

    const formFields = legalEntityFormFields.map((section) => ({
        ...section,
        fields: section.fields.map((field) => {
            if (field.optionsName) {
                const optionsValue = options[field.optionsName];
                if (optionsValue) {
                    return {
                        ...field,
                        options: optionsValue,
                    };
                }
            }
            return field;
        }),
    }));

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-foreground">Solicitud de Cupo Empresas</h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">Completa la información para solicitar tu crédito Platam.</p>
                </div>
            </div>
            <CreditaApplicationForm
                formFields={formFields}
                schema={legalEntitySchema}
                onSubmit={handleSubmit}
                defaultValues={defaultValuesLegalEntity} />
        </div>
    );
}