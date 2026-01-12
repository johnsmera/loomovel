import { ReactNode } from "react";
import { cn } from "@/app/lib/tailwind_utils";

export interface ErrorActionsProps {
  children: ReactNode;
  className?: string;
}

export function ErrorActions({ children, className }: ErrorActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-3 mt-4",
        className
      )}
    >
      {children}
    </div>
  );
}
