import { Input } from "@/components/transversal/forms/Input";
import { Select } from "@/components/transversal/forms/Select";
import { Textarea } from "@/components/transversal/forms/Textarea";
import { Checkbox } from "@/components/transversal/forms/Checkbox";
import { DatePicker } from "@/components/transversal/forms/DatePicker";
import { FieldType, FormFieldConfig, SectionInformationField } from "@/interfaces/section";
import { Control, FieldValues, useWatch } from "react-hook-form";
import { memo, useEffect, type ComponentProps } from "react";
import { FormField } from "@/interfaces/form";
import { SearchSelect } from "../forms/SearchSelect";
import { InputWithSelect } from "../forms/InputWithSelect";
import { InputNumber } from "../forms/InputNumber";

export interface SectionInformationFormProps<T extends FieldValues> extends SectionInformationField {
  control: Control<T>;
  columns?: number;
}

const renderField = <T extends FieldValues>(
  field: FormFieldConfig,
  control: Control<T>
) => {
  const { typefield, type, optionsName,  ...res } = field;
  const commonProps: FormField<any> = {
    control,
    ...res,
  };

  switch (typefield) {
    case FieldType.Select:
      return field.options ? <Select {...(commonProps as any)} options={field.options} /> : null;
    case FieldType.Textarea:
      return <Textarea {...(commonProps as any)} />;
    case FieldType.Checkbox:
      return <Checkbox {...(commonProps as React.ComponentProps<typeof Checkbox>)} />;
    case FieldType.Date:
      return <DatePicker {...(commonProps as React.ComponentProps<typeof DatePicker>)} />;
    case FieldType.SearchSelect:
      return field.options ? <SearchSelect {...(commonProps as any)}  items={field.options} /> : null;
    case FieldType.InputWithSelect:
      return field.options ? <InputWithSelect 
        type={type} 
        {...(commonProps as any)} 
        options={field.options} 
        defaultSelectValue={field.defaultSelectValue}
      /> : null;
    case FieldType.InputNumber:
      return <InputNumber {...commonProps} placeholder={field.placeholder}  />;

    default:
      return <Input {...commonProps} placeholder={field.placeholder} type={type} />;
  }
};

export const SectionInformationForm = memo(<T extends FieldValues>({
  control,
  columns = 2,
  fields,
  section,
}: SectionInformationFormProps<T>) => {
  const formValues = useWatch({ control });

  useEffect(() => {
  }, [formValues, section]);

  return (
  <section className="space-y-4">
    <h2 className="text-xl font-semibold text-light-50 dark:text-light-800 border-b border-light-800 dark:border-dark-800 pb-2">
      {section}
    </h2>
    <div className={`grid grid-cols-${columns} gap-6`}>
      {fields.map((field) => (
        <div key={field.name}>{renderField(field, control)}</div>
      ))}
    </div>
  </section>
)}) 
