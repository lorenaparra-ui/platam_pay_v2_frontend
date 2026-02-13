
import { FormField } from "./form";


export type FormFieldConfig = Omit<FormField<any>, "control"> & {
  typefield: 'input' | 'select' | 'textarea' | 'checkbox' | 'date';
}



export interface SectionInformationField {
    section: string;
    name?: string;
    columns?: number;
    fields: FormFieldConfig[];
}