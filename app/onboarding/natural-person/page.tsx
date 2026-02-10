"use client"
import { CreditaApplicationForm } from "@/features/onboarding/components/credit -application/CreditaApplicationForm";
import { defaultValuesNaturalPerson } from "@/features/onboarding/constants/natural-person";
import { naturalPersonSchema } from "@/features/onboarding/lib/schemas/natural-person-schema";

 const handleSubmit = async (data: any) => {
    try {
      
    } catch (error) {
      
    }
  }


export default function LegalEntityPage() {
    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-foreground">Solicitud de Cupo Personas</h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">Completa la información para solicitar tu crédito Platam.</p>
                </div>
            </div>
           <CreditaApplicationForm schema={naturalPersonSchema}  onSubmit={handleSubmit} defaultValues={defaultValuesNaturalPerson}  />
        </div>
    );
}