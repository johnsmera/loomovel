import { type ReactNode } from "react";
import { cn } from "@/app/lib/tailwind_utils";

type CardTitleProps = {
  children: ReactNode;
  className?: string;
};

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-light",
        "transition-colors duration-200",
        className
      )}
    >
      {children}
    </h3>
  );
}
