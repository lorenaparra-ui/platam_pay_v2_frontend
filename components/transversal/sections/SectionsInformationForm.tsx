import { Input } from "@/components/transversal/forms/Input";
import { Select } from "@/components/transversal/forms/Select";
import { Textarea } from "@/components/transversal/forms/Textarea";
import { Checkbox } from "@/components/transversal/forms/Checkbox";
import { DatePicker } from "@/components/transversal/forms/DatePicker";
import { FormFieldConfig, SectionInformationField } from "@/interfaces/section";
import { Control, FieldValues } from "react-hook-form";
import { memo } from "react";
import { FormField } from "@/interfaces/form";


export interface SectionInformationFormProps<T extends FieldValues> extends SectionInformationField {
  control: Control<T>;
  columns?: number;
}

const renderField = <T extends FieldValues>(
  field: FormFieldConfig,
  control: Control<T>
) => {
  const { typefield, type, ...res } = field;
  const commonProps: FormField<any> = {
    control,
    ...res,
  };

  switch (field.typefield) {
    case "select":
      return field.options ? <Select {...(commonProps as any)} options={field.options} /> : null;
    case "textarea":
      return <Textarea {...(commonProps as any)} />;
    case "checkbox":
      return <Checkbox {...commonProps} />;
    case "date":
      return <DatePicker {...commonProps} />;
    default:
      return <Input {...commonProps} placeholder={field.placeholder} type={type} />;
  }
};

export const SectionInformationForm = memo(<T extends FieldValues>({
  control,
  columns = 2,
  fields,
  section,
}: SectionInformationFormProps<T>) => (
  <section className="space-y-4">
    <h2 className="text-xl font-semibold text-primary-600 dark:text-primary-400 border-b border-light-800 dark:border-dark-800 pb-2">
      {section}
    </h2>
    <div className={`grid grid-cols-${columns} gap-6`}>
      {fields.map((field) => (
        <div key={field.name}>{renderField(field, control)}</div>
      ))}
    </div>
  </section>
)) 
