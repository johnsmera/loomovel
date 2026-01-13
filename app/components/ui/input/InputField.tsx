import { type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/app/lib/tailwind_utils";
import { Input } from "./Input";
import { Label } from "./Label";
import { InputError } from "./InputError";

type InputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  id: string;
  label: ReactNode;
  value?: string;
  error?: string;
  hint?: string;
  rightElement?: ReactNode;
  className?: string;
};

export function InputField({
  id,
  label,
  value = "",
  error,
  hint,
  rightElement,
  className,
  ...props
}: InputFieldProps) {
  const hasValue = value.length > 0;
  const hasError = Boolean(error);

  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className={cn(
          "relative flex items-center",
          "bg-transparent border rounded-lg",
          "transition-colors duration-200",
          hasError ? "border-error" : "border-light/20 focus-within:border-primary"
        )}
      >
        <Label htmlFor={id} visible={hasValue}>
          {label}
        </Label>
        <Input
          id={id}
          value={value}
          hasValue={hasValue}
          hasError={hasError}
          placeholder={hasValue ? "" : String(label)}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {hint && !error && (
        <span className="text-light/50 text-xs mt-1">{hint}</span>
      )}
      <InputError message={error} visible={hasError} />
    </div>
  );
}
