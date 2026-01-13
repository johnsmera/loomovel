import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/app/lib/tailwind_utils";

type IconButtonVariant = "filled" | "outline" | "ghost";
type IconButtonSize = "sm" | "md" | "lg";

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
  children?: ReactNode;
  label?: string;
  icon?: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  className?: string;
};

const variantStyles: Record<IconButtonVariant, string> = {
  filled: "bg-dark-900/90 hover:bg-dark-900 text-light border border-light/10",
  outline: "bg-transparent border border-light/30 text-light hover:bg-light/5",
  ghost: "bg-transparent text-light/70 hover:text-light hover:bg-light/5",
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "px-2 py-1 text-xs gap-1",
  md: "px-3 py-2 text-sm gap-2",
  lg: "px-4 py-2.5 text-base gap-2",
};

export function IconButton({
  children,
  label,
  icon,
  variant = "filled",
  size = "md",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-xl font-medium",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        "backdrop-blur-sm",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {label && <span>{label}</span>}
      {children}
    </button>
  );
}
