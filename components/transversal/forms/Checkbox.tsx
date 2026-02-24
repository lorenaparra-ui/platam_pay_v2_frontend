import * as React from "react";
import { Check } from "lucide-react";
import { Controller, FieldValues } from "react-hook-form";
import { cn } from "@/utils/cn";
import { FormField, Link } from "@/interfaces/form";

export type CheckboxProps<T extends FieldValues> = Omit<
  FormField<T>,
  "type" | "options" | "optionsName" | "maxDate" | "minDate" | "numberFormatLocale" | "numberFormatOptions" | "integerOnly" | "useGrouping" | "minFractionDigits" | "maxFractionDigits" | "min" | "max" | "prefix" | "suffix" | "valueKey" | "labelKey" | "imageKey" | "defaultSelectValue" | "placeholder"
>;

type ParsedLabelPart =
  | { type: "text"; content: string }
  | { type: "link"; index: number };

const parseLabelWithLinks = (label: string): ParsedLabelPart[] => {
  const regex = /%link\{(\d+)\}%/g;
  const parts: ParsedLabelPart[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(label)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: label.slice(lastIndex, match.index) });
    }
    parts.push({ type: "link", index: parseInt(match[1], 10) });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < label.length) {
    parts.push({ type: "text", content: label.slice(lastIndex) });
  }

  return parts;
};

const renderLabelWithLinks = (
  label: string,
  links?: Link[],
): React.ReactNode => {
  if (!links || links.length === 0) {
    return label;
  }

  const parts = parseLabelWithLinks(label);

  return parts.map((part, idx) => {
    if (part.type === "text") {
      return <React.Fragment key={idx}>{part.content}</React.Fragment>;
    }

    const link = links[part.index];
    if (!link) {
      return <React.Fragment key={idx}>{`%link{${part.index}}%`}</React.Fragment>;
    }

    return (
      <a
        key={idx}
        href={link.href}
        target={link.target ?? "_blank"}
        rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
        className="text-primary-500 underline hover:text-primary-600"
        onClick={(e) => e.stopPropagation()}
      >
        {link.text}
      </a>
    );
  });
};

export const Checkbox = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  className,
  links,
}: CheckboxProps<T>) => {
  if (!control) {
    console.error(
      `Checkbox component (name="${name}") is missing 'control' prop and is not wrapped in a FormProvider.`,
    );
    return null;
  }

  const renderedLabel = React.useMemo(
    () => renderLabelWithLinks(label, links),
    [label, links],
  );

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
      >
        {renderedLabel}
      </label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={undefined}
        render={({ field, fieldState }) => {
          const { value, ...fieldRest } = field;
          return (
            <>
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id={name}
                  className={cn(
                    "peer h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-slate-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary-400 checked:border-primary-400 dark:border-slate-600 dark:bg-slate-950 dark:checked:bg-primary-400 dark:checked:border-primary-400",
                    fieldState.error && "border-red-500",
                    className,
                  )}
                  {...fieldRest}
                  checked={!!value}
                />
                <Check
                  className="absolute left-0 top-0 h-4 w-4 hidden peer-checked:block text-white pointer-events-none"
                  strokeWidth={3}
                />
              </div>

              {fieldState.error && (
                <p className="text-sm text-red-400 dark:text-red-400 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};
Checkbox.displayName = "Checkbox";
