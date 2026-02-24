import { FieldValues, Path } from "react-hook-form";
import { FormField, type Option } from "./form";
import { FieldCondition } from "./condition";

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
  File = "file",
}

export type FormFieldConfig<T extends FieldValues = FieldValues> = Omit<FormField<T>, "control"> & {
  typefield: FieldType;
  name: Path<T>;
  /** @deprecated Use `condition` instead */
  dependency?: Path<T>;
  /** @deprecated Use `condition` instead */
  dependencyValue?: string | number | Date | Option | Option[];
  /** New declarative condition system */
  condition?: FieldCondition<T>;
};

export interface SectionInformationField<T extends FieldValues = FieldValues> {
  columns?: number;
  /** @deprecated Use `condition` instead */
  dependency?: Path<T>;
  /** @deprecated Use `condition` instead */
  dependencyValue?: string | number | Date | Option | Option[];
  /** New declarative condition system for section visibility */
  condition?: FieldCondition<T>;
  fields: FormFieldConfig<T>[];
  section: string;
  name?: string;
}
