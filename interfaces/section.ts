
import { FormField } from "./form";

export enum FieldType {
    Input = 'input',
    Search = 'search',
    SearchSelect = 'search-select',
    Select = 'select',
    Textarea = 'textarea',
    Checkbox = 'checkbox',
    Date = 'date',
    InputWithSelect = 'input-with-select',
    InputNumber = 'input-number',
}


export type FormFieldConfig = Omit<FormField<any>, "control"> & {
  typefield:  FieldType;
}



export interface SectionInformationField {
    section: string;
    name?: string;
    columns?: number;
    fields: FormFieldConfig[];
}