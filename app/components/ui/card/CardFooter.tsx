import { type ReactNode } from "react";
import { cn } from "@/app/lib/tailwind_utils";

type CardFooterProps = {
  children: ReactNode;
  className?: string;
};

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-t border-white/10",
        "bg-white/5",
        className
      )}
    >
      {children}
    </div>
  );
}
