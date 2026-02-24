import { inputVariants } from "@/components/transversal/forms/Input";
import { VariantProps } from "class-variance-authority";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { SectionInformationField } from "./section";
import { Link } from "./components";
import { FieldCondition } from "./condition";

export type { Link };


export interface SearchOption {
  id: string | number;
  label: string;
  value: string | number;
}

export interface Option {
  value: string;
  label: string;
}

export interface FormField<T extends FieldValues>
  extends VariantProps<typeof inputVariants> {
  className?: string;
  control: Control<T>;
  defaultSelectValue?: string;
  defaultValue?: Path<T> extends keyof T ? T[Path<T>] : unknown;
  /** @deprecated Use `condition` instead */
  dependency?: Path<T>;
  /** @deprecated Use `condition` instead */
  dependencyValue?: string | number | Date | Option | Option[];
  /** New declarative condition system */
  condition?: FieldCondition<T>;
  imageKey?: string;
  label: string;
  labelKey?: string;
  links?: Link[];
  maxDate?: Date | string;
  minDate?: Date | string;
  name: Path<T>;
  options?: Option[];
  optionsName?: string;
  placeholder?: string;
  rules?: RegisterOptions<T>;
  type?: 'text' | 'number' | 'email' | 'password';
  numberFormatLocale?: string;
  numberFormatOptions?: Intl.NumberFormatOptions;
  integerOnly?: boolean;
  useGrouping?: boolean;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
  valueKey?: string;
  /** Para FileInput: tipos MIME o extensiones (ej. "image/*,.pdf") */
  accept?: string;
  /** Para FileInput: tamaño máximo por archivo en bytes */
  maxSize?: number;
  /** Para FileInput: permitir varios archivos */
  multiple?: boolean;
}

export interface FormStep<T extends FieldValues = FieldValues> {
  step: number;
  /** @deprecated Use `condition` instead */
  dependency?: Path<T>;
  /** @deprecated Use `condition` instead */
  dependencyValue?: string | number | boolean;
  /** New declarative condition system for step visibility */
  condition?: FieldCondition<T>;
  sections: SectionInformationField<T>[];
}
