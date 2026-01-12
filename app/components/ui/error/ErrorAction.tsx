import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/app/lib/tailwind_utils";

export interface ErrorActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function ErrorAction({
  children,
  variant = "primary",
  className,
  ...props
}: ErrorActionProps) {
  const variantStyles = {
    primary:
      "bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300",
    secondary:
      "bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50 text-gray-300",
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-colors duration-200",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
