import { ChartSkeleton } from "./ChartSkeleton";
import { MapSkeleton } from "./MapSkeleton";

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="py-8 space-y-8">
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
  );
}
