import { cn } from "@/app/lib/tailwind_utils";

export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  width,
  height,
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width: width ?? "100%",
    height: height ?? "1rem",
  };

  return (
    <div
      className={cn(
        "bg-gray-800/50 rounded-lg animate-pulse",
        className
      )}
      style={style}
      aria-label="Carregando..."
      role="status"
    />
  );
}
