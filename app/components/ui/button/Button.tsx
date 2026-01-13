import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/app/lib/tailwind_utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary hover:bg-primary/90 text-white",
  secondary: "bg-transparent border border-primary text-primary hover:bg-primary/10",
  ghost: "bg-transparent text-light/70 hover:text-light hover:bg-light/5",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-6 py-3 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={cn(
        "rounded-lg font-medium",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </button>
  );
}
