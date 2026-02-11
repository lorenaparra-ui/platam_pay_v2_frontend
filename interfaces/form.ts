import { inputVariants } from "@/components/transversal/forms/Input";
import { VariantProps } from "class-variance-authority";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { SectionInformationField } from "./section";


export interface Option {
  value: string;
  label: string;
};

export interface FormField<T extends FieldValues>
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue" | "size">,
    VariantProps<typeof inputVariants> {
    name: Path<T> 
    control: Control<T>
    label: string
    rules?: RegisterOptions<T>
    placeholder?: string;
    type?: 'text' | 'number' | 'email' | 'password' ;
    options?: Option[];
    optionsName?: string,
}

export interface FormStep {
 step: number
 sections: SectionInformationField[] 
}
