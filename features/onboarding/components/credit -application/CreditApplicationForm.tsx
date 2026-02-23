import { FormStep } from "@/interfaces/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import type { ZodSchema } from "zod";
import { Stepper } from "@/components/transversal/sections/FormStep";

export interface FormProps {
  formFields: FormStep[];
  schema: ZodSchema<any>;
  onSubmit: (data: any) => Promise<void> | void;
  defaultValues?: any;
}

export function CreditaApplicationForm({
  formFields,
  schema,
  onSubmit,
  defaultValues,
}: FormProps) {
  const { control, handleSubmit, reset, trigger, getValues } =
    useForm<any>({ resolver: zodResolver(schema as any), defaultValues });

  const submitHandler: SubmitHandler<any> = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
        <Stepper
          steps={formFields}
          control={control}
          trigger={trigger}
          getValues={getValues}
        />
      </form>
    </div>
  );
}
