import { type InputHTMLAttributes } from "react";
import { cn } from "@/app/lib/tailwind_utils";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & {
  className?: string;
};

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      {...props}
      type="checkbox"
      className={cn(
        "w-4 h-4 rounded",
        "bg-transparent border-2 border-light/30",
        "checked:bg-primary checked:border-primary",
        "focus:ring-2 focus:ring-primary/50 focus:ring-offset-0",
        "transition-colors duration-200",
        "cursor-pointer accent-primary",
        className
      )}
    />
  );
}
