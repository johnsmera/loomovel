import { type ReactNode } from "react";
import { cn } from "@/app/lib/tailwind_utils";

type LabelProps = {
  children: ReactNode;
  htmlFor?: string;
  visible?: boolean;
  className?: string;
};

export function Label({
  children,
  htmlFor,
  visible = true,
  className,
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "absolute left-3 text-light/60 text-sm pointer-events-none",
        "transition-all duration-200 ease-out",
        visible
          ? "top-1 text-xs text-primary opacity-100"
          : "top-1/2 -translate-y-1/2 opacity-0",
        className
      )}
    >
      {children}
    </label>
  );
}
