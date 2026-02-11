"use client";
import { SectionInformationForm } from "@/components/transversal/sections/SectionsInformationForm";

import {  SectionInformationField } from "@/interfaces/section";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import type { ZodSchema } from "zod";

export interface FormProps {
    formFields: SectionInformationField[]
    schema: ZodSchema<any>
    onSubmit: (data: any) => Promise<void> | void
    defaultValues?: any
}

export function CreditaApplicationForm({  formFields, schema, onSubmit, defaultValues }: FormProps) {
    const { control, handleSubmit, reset } = useForm<any>({ resolver: zodResolver(schema as any), defaultValues });

    const submitHandler: SubmitHandler<any> = async (data) => {
        try {
            await onSubmit(data);
            reset();
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-8" >
                {formFields.map((section) => (
                  <SectionInformationForm
                    key={section.section}
                    control={control}
                    section={section.section}
                    fields={section.fields}
                  />
                ))} 

                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        className="bg-primary-400 text-dark-950 px-8 py-3 rounded-lg font-bold hover:bg-primary-500 hover:shadow-primary active:scale-95 transition-all duration-200 w-full md:w-auto"
                    >
                        Enviar Solicitud
                    </button>
                </div>

            </form>
        </div >
    );
}   
