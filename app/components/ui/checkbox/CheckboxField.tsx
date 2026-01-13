import { type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/app/lib/tailwind_utils";
import { Checkbox } from "./Checkbox";

type CheckboxFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & {
  id: string;
  label: ReactNode;
  checked?: boolean;
  className?: string;
};

export function CheckboxField({
  id,
  label,
  checked = false,
  className,
  ...props
}: CheckboxFieldProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-center gap-2 cursor-pointer",
        "text-light/70 text-sm",
        "hover:text-light transition-colors duration-200",
        className
      )}
    >
      <Checkbox id={id} checked={checked} {...props} />
      <span>{label}</span>
    </label>
  );
}
