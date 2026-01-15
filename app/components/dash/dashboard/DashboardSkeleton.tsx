import { ChartSkeleton } from "./ChartSkeleton";
import { MapSkeleton } from "./MapSkeleton";
import { Skeleton } from "@/app/components/ui/skeleton/Skeleton";

function PageHeaderSkeleton() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-sidebar z-40 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-20 flex-shrink-0" />
        <div className="flex items-center gap-3 px-8 lg:px-12">
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </header>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />
      <div className="min-h-screen">
        <div className="py-8 pt-24 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <ChartSkeleton titleWidth="180px" showFilters chartType="area" />
            </div>
            <div className="lg:col-span-4">
              <ChartSkeleton titleWidth="160px" chartType="bar" />
            </div>
          </div>

          <MapSkeleton />
        </div>
      </div>
    </>
  );
}
