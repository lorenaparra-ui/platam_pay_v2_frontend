import { FormStep } from "@/interfaces/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import type { ZodSchema } from "zod";
import { useEffect } from "react";
import { Stepper } from "@/components/transversal/sections/FormStep";
import { useSearchParams } from "next/navigation";

export interface FormProps {
  formFields: FormStep[];
  schema: ZodSchema<any>;
  onSubmit: (data: any) => Promise<void> | void;
  defaultValues?: any;
}

export function CreditaApplicationForm({  formFields, schema, onSubmit, defaultValues }: FormProps) {
    const searchParams = useSearchParams();
    const application_type = searchParams.get("application_type");
    const { control, handleSubmit, reset, trigger, setValue, getValues } = useForm<any>({ resolver: zodResolver(schema as any), defaultValues });


    const submitHandler: SubmitHandler<any> = async (data) => {
        try {
            await onSubmit(data);
            reset();
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    useEffect(() => {
        if (application_type) {
            setValue("application_type", application_type);
        }
    }, [application_type, setValue]);
  

    return (
        <div className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-8" >
                <Stepper
                    steps={formFields}
                    control={control}
                    trigger={trigger}
                    getValues={getValues}
                />
            </form>
        </div >
    );
}   