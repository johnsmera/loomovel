import { Skeleton } from "./Skeleton";
import { cn } from "@/app/lib/tailwind_utils";

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}

export function SkeletonText({
  lines = 3,
  className,
  lastLineWidth = "60%",
}: SkeletonTextProps) {
  return (
    <div className={className} role="status" aria-label="Carregando texto...">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height="1rem"
          width={index === lines - 1 ? lastLineWidth : "100%"}
          className={cn(index === lines - 1 ? "mb-0" : "mb-2")}
        />
      ))}
    </div>
  );
}
