import { Suspense, ReactNode } from "react";
import { SkeletonCard } from "../skeleton/SkeletonCard";

export interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function SuspenseBoundary({
  children,
  fallback,
}: SuspenseBoundaryProps) {
  const defaultFallback = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} showImage showAvatar lines={3} />
      ))}
    </div>
  );

  return (
    <Suspense fallback={fallback ?? defaultFallback}>{children}</Suspense>
  );
}
