
import * as React from "react"
import { cn } from "@/utils/cn"
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form"
import { ChevronDown, Check } from "lucide-react"

export interface InputWithSelectProps<T extends FieldValues, TOption extends Record<string, any>>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue" | "size"> {
  name: Path<T>
  control: Control<T>
  options: TOption[]
  labelKey: keyof TOption
  valueKey: keyof TOption
  imageKey?: keyof TOption
  label?: string
  placeholder?: string
  className?: string
  rules?: RegisterOptions<T>
  defaultSelectValue?: string
  onSelectChange?: (value: string) => void
}

export const InputWithSelect = <T extends FieldValues, TOption extends Record<string, any>>({
  name,
  label,
  control,
  options,
  labelKey,
  valueKey,
  imageKey,
  placeholder,
  className,
  rules,
  disabled,
  defaultSelectValue,
  onSelectChange,
  type,
  ...props
}: InputWithSelectProps<T, TOption>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(defaultSelectValue || String(options[0]?.[valueKey] || ""));
  const containerRef = React.useRef<HTMLDivElement>(null);

  const currentOption = options.find(opt => String(opt[valueKey]) === String(selectedValue)) || options[0];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    if (disabled) return;
    setSelectedValue(val);
    setIsOpen(false);
    if (onSelectChange) onSelectChange(val);
  };

  return (
    <div className={cn("mb-4", className)} ref={containerRef}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={undefined}
        render={({ field, fieldState }) => {
          const hasError = !!fieldState.error;
          
          return (
            <>
              <div 
                className={cn(
                  "relative flex h-10 w-full rounded-lg border bg-white ring-offset-white transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-400/50 focus-within:border-primary-400 dark:bg-slate-950 dark:ring-offset-slate-950 dark:text-slate-50",
                  hasError 
                    ? "border-red-500 focus-within:ring-red-500/30 dark:border-red-300" 
                    : "border-slate-200 dark:border-slate-800",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {/* Custom Select Trigger */}
                <div 
                  className={cn(
                    "flex items-center gap-2 px-3 border-r border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 rounded-l-lg transition-colors min-w-[fit-content]",
                    disabled && "pointer-events-none"
                  )}
                  onClick={() => !disabled && setIsOpen(!isOpen)}
                >
                  {imageKey && currentOption?.[imageKey] && (
                    <img 
                      src={currentOption[imageKey]} 
                      alt="" 
                      className="w-5 h-5 rounded-full object-cover" 
                    />
                  )}
                  <span className="text-sm font-medium whitespace-nowrap">
                    {currentOption?.[labelKey]}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 text-slate-500 transition-transform", isOpen && "rotate-180")} />
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full sm:w-auto sm:min-w-[200px] h-32 overflow-y-auto rounded-md border border-slate-200 bg-white shadow-lg z-50 dark:bg-slate-950 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-1">
                      {options.map((opt, index) => {
                        const isSelected = String(opt[valueKey]) === String(selectedValue);

                        return (
                          <div
                            key={index}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 text-sm rounded-sm cursor-pointer transition-colors",
                              isSelected 
                                ? "bg-primary-50 text-primary-900 dark:bg-primary-900/20 dark:text-primary-100" 
                                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                            )}
                            onClick={() => handleSelect(String(opt[valueKey]))}
                          >
                            {imageKey && opt[imageKey] && (
                              <img 
                                src={opt[imageKey]} 
                                alt="" 
                                className="w-5 h-5 rounded-full object-cover shrink-0" 
                              />
                            )}
                            <span className="flex-1 truncate">{opt[labelKey]}</span>
                            {isSelected && <Check className="h-4 w-4 shrink-0 text-primary-500" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Input Section */}
                <input
                  type={type}
                  className="flex-1 w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400 disabled:cursor-not-allowed"
                  placeholder={placeholder}
                  disabled={disabled}
                  {...field}
                  value={field.value ?? ""}
                  {...props}
                />
              </div>

              {fieldState.error && (
                <p className="text-sm text-red-400 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  )
}

InputWithSelect.displayName = "InputWithSelect"
