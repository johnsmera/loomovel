import { Skeleton } from "@/app/components/ui/skeleton/Skeleton";
import { cn } from "@/app/lib/tailwind_utils";

function HeaderSkeleton() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-sidebar z-40 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-20 flex-shrink-0" />
        <div className="flex items-center gap-3 px-8 lg:px-12">
          <Skeleton className="h-6 w-48" />
        </div>
      </div>
    </header>
  );
}

function PlanCardSkeleton() {
  return (
    <div className="flex flex-col items-start p-4 rounded-lg border border-white/20 min-w-[120px]">
      <Skeleton className="h-3 w-16 mb-2" />
      <Skeleton className="h-6 w-20 mb-1" />
      <Skeleton className="h-2 w-12" />
    </div>
  );
}

function SliderSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-1.5 w-full rounded-full" />
      <div className="flex justify-between">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

function CoverageSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-5 h-5 rounded" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-4 w-16" />
    </div>
  );
}

function LeftColumnSkeleton() {
  return (
    <div
      className={cn(
        "rounded-xl p-6",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10"
      )}
    >
      {/* Plans Title */}
      <Skeleton className="h-4 w-36 mb-4" />

      {/* Plan Cards */}
      <div className="flex gap-3 mb-8">
        <PlanCardSkeleton />
        <PlanCardSkeleton />
        <PlanCardSkeleton />
      </div>

      {/* Sliders */}
      <div className="space-y-6 mb-8">
        <SliderSkeleton />
        <SliderSkeleton />
      </div>

      {/* Coverages Title */}
      <Skeleton className="h-4 w-36 mb-4" />

      {/* Coverages */}
      <div className="space-y-3">
        <CoverageSkeleton />
        <CoverageSkeleton />
        <CoverageSkeleton />
        <CoverageSkeleton />
      </div>
    </div>
  );
}

function BenefitsSkeleton() {
  return (
    <div
      className={cn(
        "rounded-xl p-6",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10"
      )}
    >
      <Skeleton className="h-4 w-32 mb-4" />
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-28 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>
    </div>
  );
}

function IndicatorCardSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-sidebar border border-white/10">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-6 w-20" />
    </div>
  );
}

function IndicatorsSkeleton() {
  return (
    <div
      className={cn(
        "rounded-xl p-6",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10"
      )}
    >
      <Skeleton className="h-4 w-24 mb-4" />
      <div className="space-y-3">
        <IndicatorCardSkeleton />
        <IndicatorCardSkeleton />
        <IndicatorCardSkeleton />
      </div>
    </div>
  );
}

export function SimulatorSkeleton() {
  return (
    <>
      <HeaderSkeleton />
      <div className="py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <LeftColumnSkeleton />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6">
            <BenefitsSkeleton />
            <IndicatorsSkeleton />
          </div>
        </div>
      </div>
    </>
  );
}
