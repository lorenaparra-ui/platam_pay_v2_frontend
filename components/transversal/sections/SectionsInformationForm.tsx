import { Input } from "@/components/transversal/forms/Input";
import { Select } from "@/components/transversal/forms/Select";
import { Textarea } from "@/components/transversal/forms/Textarea";
import { Checkbox } from "@/components/transversal/forms/Checkbox";
import { DatePicker } from "@/components/transversal/forms/DatePicker";
import { FieldType, FormFieldConfig, SectionInformationField } from "@/interfaces/section";
import { Control, FieldValues, useWatch, Path } from "react-hook-form";
import { memo, useMemo, type ReactElement } from "react";
import { FormField } from "@/interfaces/form";
import { SearchSelect } from "../forms/SearchSelect";
import { InputWithSelect } from "../forms/InputWithSelect";
import { InputNumber } from "../forms/InputNumber";
import { FileInput } from "../forms/FileInput";
import { FieldCondition } from "@/interfaces/condition";
import {
  evaluateCondition,
  convertLegacyToCondition,
  extractWatchFields,
} from "@/utils/evaluateCondition";

export interface SectionInformationFormProps<T extends FieldValues> extends SectionInformationField<T> {
  control: Control<T>;
  columns?: number;
}

type RenderableField<T extends FieldValues> = Omit<FormFieldConfig<T>, "condition" | "dependency" | "dependencyValue">;

const renderField = <T extends FieldValues>(
  field: RenderableField<T>,
  control: Control<T>
): ReactElement | null => {
  const { typefield, type, optionsName, ...res } = field;
  
  const commonProps = {
    control,
    ...res,
  } as FormField<T>;

  switch (typefield) {
    case FieldType.Select:
      return field.options ? (
        <Select<T>
          {...commonProps}
          options={field.options}
        />
      ) : null;

    case FieldType.Textarea:
      return <Textarea<T> {...commonProps} />;

    case FieldType.Checkbox:
      return <Checkbox<T> {...commonProps} />;

    case FieldType.Date:
      return <DatePicker<T> {...commonProps} />;

    case FieldType.SearchSelect:
      return field.options ? (
        <SearchSelect<T>
          {...commonProps}
          items={field.options.map((opt, idx) => ({
            id: idx,
            label: opt.label,
            value: opt.value,
          }))}
        />
      ) : null;

    case FieldType.InputWithSelect:
      return field.options ? (
        <InputWithSelect<T, typeof field.options[number]>
          name={field.name}
          control={control}
          label={field.label}
          options={field.options}
          labelKey="label"
          valueKey="value"
          type={type}
          placeholder={field.placeholder}
          defaultSelectValue={field.defaultSelectValue}
          rules={field.rules}
          className={field.className}
        />
      ) : null;

    case FieldType.InputNumber:
      return (
        <InputNumber<T>
          {...commonProps}
          placeholder={field.placeholder}
        />
      );

    case FieldType.File: {
      const {
        typefield: _tf,
        type: _t,
        optionsName: _optName,
        defaultValue: _dv,
        defaultSelectValue: _dsv,
        options: _opt,
        ...fileRest
      } = field;
      return (
        <FileInput<T>
          {...fileRest}
          control={control}
          accept={field.accept}
          maxSize={field.maxSize}
          multiple={field.multiple}
          placeholder={field.placeholder}
        />
      );
    }

    default:
      return (
        <Input<T>
          {...commonProps}
          placeholder={field.placeholder}
          type={type}
        />
      );
  }
};

interface ConditionalFieldWrapperProps<T extends FieldValues> {
  field: FormFieldConfig<T>;
  control: Control<T>;
}

function useFieldVisibility<T extends FieldValues>(
  control: Control<T>,
  condition: FieldCondition<T> | null | undefined,
  legacyDependency?: Path<T>,
  legacyDependencyValue?: unknown
): boolean {
  const effectiveCondition = useMemo(() => {
    if (condition) {
      return condition;
    }
    if (legacyDependency) {
      return convertLegacyToCondition<T>({
        dependency: legacyDependency,
        dependencyValue: legacyDependencyValue as string | number | boolean | Date | null | undefined,
      });
    }
    return null;
  }, [condition, legacyDependency, legacyDependencyValue]);

  const watchFields = useMemo(() => {
    if (!effectiveCondition) {
      return [];
    }
    const fields = extractWatchFields(effectiveCondition);
    return [...new Set(fields)];
  }, [effectiveCondition]);

  const watchedValues = useWatch({
    control,
    name: watchFields.length > 0 ? (watchFields as Path<T>[]) : ([] as Path<T>[]),
  });

  const formValues = useWatch({ control });

  return useMemo(() => {
    if (!effectiveCondition) {
      return true;
    }
    return evaluateCondition(effectiveCondition, formValues);
  }, [effectiveCondition, formValues, watchedValues]);
}

const ConditionalFieldWrapper = <T extends FieldValues>({
  field,
  control,
}: ConditionalFieldWrapperProps<T>): ReactElement | null => {
  const { condition, dependency, dependencyValue, ...renderableField } = field;

  const isVisible = useFieldVisibility(
    control,
    condition,
    dependency,
    dependencyValue
  );

  if (!isVisible) {
    return null;
  }

  return renderField(renderableField as RenderableField<T>, control);
};

const ConditionalFieldWrapperMemo = memo(ConditionalFieldWrapper) as typeof ConditionalFieldWrapper;

export const SectionInformationForm = memo(<T extends FieldValues>({
  control,
  columns = 2,
  fields,
  section,
  condition,
  dependency,
  dependencyValue,
}: SectionInformationFormProps<T>): ReactElement | null => {
  const isSectionVisible = useFieldVisibility(
    control,
    condition,
    dependency,
    dependencyValue
  );

  if (!isSectionVisible) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-light-50 dark:text-light-800 border-b border-light-800 dark:border-dark-800 pb-2">
        {section}
      </h2>
      <div className={`grid grid-cols-${columns} gap-6`}>
        {fields.map((field) => (
          <div key={field.name}>
            <ConditionalFieldWrapperMemo<T> field={field} control={control} />
          </div>
        ))}
      </div>
    </section>
  );
});
