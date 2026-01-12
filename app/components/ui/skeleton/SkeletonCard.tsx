import { Skeleton } from "./Skeleton";
import { cn } from "@/app/lib/tailwind_utils";

export interface SkeletonCardProps {
  showAvatar?: boolean;
  showImage?: boolean;
  lines?: number;
  className?: string;
}

export function SkeletonCard({
  showAvatar = false,
  showImage = false,
  lines = 2,
  className,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4",
        className
      )}
      role="status"
      aria-label="Carregando card..."
    >
      {showImage && (
        <Skeleton height="200px" className="mb-4 rounded-lg" />
      )}
      <div className="flex gap-3">
        {showAvatar && (
          <Skeleton width="48px" height="48px" className="rounded-full" />
        )}
        <div className="flex-1">
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              key={index}
              height="1rem"
              width={index === lines - 1 ? "60%" : "100%"}
              className={cn(index === lines - 1 ? "mb-0" : "mb-2")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
