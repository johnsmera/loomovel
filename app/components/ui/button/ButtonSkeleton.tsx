import { cn } from "@/app/lib/tailwind_utils";

type ButtonSkeletonSize = "sm" | "md" | "lg";

type ButtonSkeletonProps = {
  size?: ButtonSkeletonSize;
  fullWidth?: boolean;
  className?: string;
};

const sizeStyles: Record<ButtonSkeletonSize, string> = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
};

export function ButtonSkeleton({
  size = "md",
  fullWidth = false,
  className,
}: ButtonSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-light/10 animate-pulse",
        sizeStyles[size],
        fullWidth ? "w-full" : "w-32",
        className
      )}
    />
  );
}
