import { type InputHTMLAttributes } from "react";
import { cn } from "@/app/lib/tailwind_utils";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  hasError?: boolean;
  hasValue?: boolean;
  className?: string;
};

export function Input({
  hasError = false,
  hasValue = false,
  className,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full bg-transparent text-light placeholder-light/40",
        "py-3 px-3 outline-none",
        "transition-colors duration-200",
        hasValue && "pt-5 pb-1",
        hasError && "text-error",
        className
      )}
    />
  );
}
