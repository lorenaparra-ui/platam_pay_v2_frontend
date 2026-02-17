import { inputVariants } from "@/components/transversal/forms/Input";
import { VariantProps } from "class-variance-authority";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { SectionInformationField } from "./section";


export interface SearchOption {
  id: string | number;
  label: string;
  value: any;
}

export interface Option {
  value: string;
  label: string;
};

export interface FormField<T extends FieldValues>
  extends VariantProps<typeof inputVariants> {
  className?: string;
  control: Control<T>;
  defaultSelectValue?: string;
  defaultValue?: Path<T> extends keyof T ? T[Path<T>] : any;
  dependency?: Path<T>;
  dependencyValue?: string | number | Date | Option | Option[];
  imageKey?: string;
  label: string;
  labelKey?: string;
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
}

export interface FormStep {
  step: number
  sections: SectionInformationField[]
}
