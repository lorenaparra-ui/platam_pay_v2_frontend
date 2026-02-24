import { useRef, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Control, Controller, FieldValues, Path, RegisterOptions, useFormContext } from "react-hook-form";
import { inputVariants } from "./Input";
import {
  FileText,
  FileImage,
  FileSpreadsheet,
  FileCode,
  File,
  X,
  Upload,
} from "lucide-react";

const fileInputTriggerVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:ring-offset-slate-950",
  {
    variants: {
      variant: {
        default:
          "border-slate-200 text-slate-700 hover:bg-slate-50 focus-visible:ring-primary-400/50 focus-visible:border-primary-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus-visible:border-primary-400",
        error:
          "border-red-500 text-red-600 focus-visible:ring-red-500/30 dark:border-red-300 dark:text-red-400",
        success:
          "border-green-500 text-green-600 focus-visible:ring-green-500/30 dark:border-green-500 dark:text-green-400",
      },
      inputSize: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

const fileBoxVariants = cva(
  "relative flex items-center gap-3 rounded-lg border bg-slate-50 px-3 py-2.5 text-sm transition-colors dark:bg-slate-900/50",
  {
    variants: {
      variant: {
        default:
          "border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200",
        error:
          "border-red-200 bg-red-50/50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function getFileIcon(type: string) {
  const mime = type.toLowerCase();
  const iconClass = "h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400";
  if (mime.startsWith("image/")) return <FileImage className={iconClass} />;
  if (
    mime.includes("sheet") ||
    mime.includes("excel") ||
    mime === "application/csv" ||
    mime === "text/csv"
  )
    return <FileSpreadsheet className={iconClass} />;
  if (
    mime.includes("pdf") ||
    mime.startsWith("text/") ||
    mime.includes("document")
  )
    return <FileText className={iconClass} />;
  if (
    mime.includes("json") ||
    mime.includes("javascript") ||
    mime.includes("xml") ||
    mime.includes("html")
  )
    return <FileCode className={iconClass} />;
  return <File className={iconClass} />;
}

/** Comprueba si un valor es un File sin asumir que el global File sea invocable (SSR/bundling). */
function isFile(value: unknown): value is File {
  if (value == null || typeof value !== "object") return false;
  try {
    if (typeof globalThis.File === "function") {
      return value instanceof globalThis.File;
    }
  } catch {
    // instanceof no disponible o File no es constructor
  }
  return (
    typeof (value as File).name === "string" &&
    typeof (value as File).size === "number" &&
    typeof (value as File).type === "string"
  );
}

function normalizeFiles(value: unknown): File[] {
  if (value == null) return [];
  if (Array.isArray(value)) return value.filter(isFile);
  try {
    if (typeof globalThis.FileList === "function" && value instanceof globalThis.FileList) {
      return Array.from(value);
    }
  } catch {
    // FileList no disponible
  }
  return [];
}

export interface FileInputProps<T extends FieldValues>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "name" | "value" | "onChange" | "type" | "multiple" | "defaultValue"
  >,
    VariantProps<typeof fileInputTriggerVariants> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  rules?: RegisterOptions<T>;
  /** Tipos MIME o extensiones permitidas (ej: "image/*,.pdf") */
  accept?: string;
  /** Tamaño máximo por archivo en bytes */
  maxSize?: number;
  /** Permitir varios archivos */
  multiple?: boolean;
  /** Texto del botón de selección */
  placeholder?: string;
  /** Callback cuando cambia la lista de archivos */
  onFilesChange?: (files: File[]) => void;
  /** Callback al eliminar un archivo de la lista */
  onFileRemove?: (file: File, index: number) => void;
  className?: string;
  wrapperClassName?: string;
}

export const FileInput = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  accept,
  maxSize,
  multiple = false,
  placeholder = "Elegir archivos",
  onFilesChange,
  onFileRemove,
  className,
  wrapperClassName,
  variant,
  inputSize,
  disabled,
  ...restProps
}: FileInputProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formContext = useFormContext<T>();
  const setError = formContext?.setError;
  const clearErrors = formContext?.clearErrors;

  const triggerClick = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const validateFiles = useCallback(
    (files: File[]): string | null => {
      if (!accept && maxSize == null) return null;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (maxSize != null && file.size > maxSize) {
          const mb = (maxSize / 1024 / 1024).toFixed(1);
          return `"${file.name}" supera el tamaño máximo permitido (${mb} MB).`;
        }
        if (accept?.trim()) {
          const accepted = accept.split(",").map((a) => a.trim().toLowerCase());
          const ext = `.${(file.name.split(".").pop() ?? "").toLowerCase()}`;
          const mime = file.type.toLowerCase();
          const matches = accepted.some((a) => {
            if (a.startsWith(".")) return ext === a;
            if (a.endsWith("/*")) return mime.startsWith(a.replace(/\/\*$/, "/"));
            return mime === a || ext === a;
          });
          if (!matches) {
            return `Tipo de archivo no permitido: ${file.name}`;
          }
        }
      }
      return null;
    },
    [accept, maxSize]
  );

  return (
    <div className={cn("mb-4", wrapperClassName)}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200"
      >
        {label}
      </label>

      <Controller<T>
        name={name}
        control={control}
        rules={rules}
        defaultValue={[] as T[Path<T>]}
        render={({ field, fieldState }) => {
          const files = normalizeFiles(field.value);

          const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const nextFiles = e.target.files ? Array.from(e.target.files) : [];
            const message = validateFiles(nextFiles);
            if (setError && message) {
              setError(name, { type: "manual", message });
              return;
            }
            if (clearErrors) clearErrors(name);
            const value = multiple ? nextFiles : nextFiles.slice(0, 1);
            field.onChange(value);
            onFilesChange?.(value);
            e.target.value = "";
          };

          const handleRemove = (index: number) => {
            const file = files[index];
            const next = files.filter((_, i) => i !== index);
            field.onChange(next);
            onFilesChange?.(next);
            onFileRemove?.(file, index);
            if (clearErrors) clearErrors(name);
          };

          return (
            <>
              <div
                className={cn(
                  "flex flex-wrap items-center gap-3 rounded-lg border bg-white p-3 transition-colors dark:bg-slate-950 dark:border-slate-800",
                  fieldState.error && "border-red-500 dark:border-red-500",
                  className
                )}
              >
                <button
                  type="button"
                  disabled={disabled}
                  onClick={triggerClick}
                  className={cn(
                    fileInputTriggerVariants({
                      variant: fieldState.error ? "error" : variant,
                      inputSize,
                    })
                  )}
                >
                  <Upload className="h-4 w-4 shrink-0" />
                  {placeholder}
                </button>

                <input
                  ref={(el) => {
                    (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
                    if (typeof field.ref === "function") field.ref(el);
                    else if (field.ref) (field.ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
                  }}
                  type="file"
                  name={field.name}
                  accept={accept}
                  multiple={multiple}
                  disabled={disabled}
                  onChange={handleInputChange}
                  onBlur={field.onBlur}
                  className="sr-only"
                  aria-hidden
                  {...restProps}
                />

                {files.length > 0 && (
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    {files.length} {files.length === 1 ? "archivo" : "archivos"} seleccionado
                    {files.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {files.length > 0 && (
                <ul className="mt-3 flex flex-col gap-2">
                  {files.map((file, index) => (
                    <li key={`${file.name}-${index}-${file.size}`}>
                      <div
                        className={cn(
                          fileBoxVariants({
                            variant: fieldState.error ? "error" : "default",
                          })
                        )}
                      >
                        {getFileIcon(file.type)}
                        <span className="min-w-0 flex-1 truncate" title={file.name}>
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemove(index)}
                          className="ml-1 rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                          aria-label={`Eliminar ${file.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

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

FileInput.displayName = "FileInput";
