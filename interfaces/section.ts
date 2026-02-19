import { FormField, type Option } from "./form";

export enum FieldType {
  Input = "input",
  Search = "search",
  SearchSelect = "search-select",
  Select = "select",
  Textarea = "textarea",
  Checkbox = "checkbox",
  Date = "date",
  InputWithSelect = "input-with-select",
  InputNumber = "input-number",
}

export type FormFieldConfig = Omit<FormField<any>, "control"> & {
  typefield: FieldType;
};

export interface SectionInformationField {
  columns?: number;
  dependency?: string;
  dependencyValue?: string | number | Date | Option | Option[];
  fields: FormFieldConfig[];
  section: string;
  name?: string;
}
