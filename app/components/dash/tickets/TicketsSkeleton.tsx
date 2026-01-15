import { Skeleton } from "@/app/components/ui/skeleton/Skeleton";
import { cn } from "@/app/lib/tailwind_utils";

function HeaderSkeleton() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-sidebar z-40 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-20 flex-shrink-0" />
        <div className="flex items-center gap-3 px-8 lg:px-12">
          <Skeleton className="h-6 w-40" />
        </div>
      </div>
      <div className="flex items-center gap-4 px-8 lg:px-12">
        <Skeleton className="h-9 w-32 rounded-lg" />
      </div>
    </header>
  );
}

function KpiCardSkeleton() {
  return (
    <div
      className={cn(
        "rounded-xl",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10",
        "p-6"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="w-12 h-12 rounded-lg" />
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div
      className={cn(
        "rounded-xl",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10"
      )}
    >
      {/* Toolbar Skeleton */}
      <div className="flex items-center justify-between gap-4 p-6 border-b border-white/10">
        <Skeleton className="h-6 w-32" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="flex items-center gap-4 px-6 py-3 border-b border-white/10">
        {[80, 100, 150, 200, 100, 100, 120, 100].map((width, idx) => (
          <Skeleton key={idx} className="h-4" />
        ))}
      </div>

      {/* Rows Skeleton */}
      {Array.from({ length: 5 }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="flex items-center gap-4 px-6 py-4 border-b border-white/5"
        >
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      ))}

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-center gap-2 py-4 border-t border-white/10">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  );
}

export function TicketsSkeleton() {
  return (
    <>
      <HeaderSkeleton />
      <div className="py-8 pt-24 space-y-8">
        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCardSkeleton />
          <KpiCardSkeleton />
          <KpiCardSkeleton />
          <KpiCardSkeleton />
        </div>

        {/* Table Skeleton */}
        <TableSkeleton />
      </div>
    </>
  );
}
