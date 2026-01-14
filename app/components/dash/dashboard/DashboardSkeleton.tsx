import { ChartSkeleton } from "./ChartSkeleton";
import { MapSkeleton } from "./MapSkeleton";
import { Shield } from "lucide-react";

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen">
      <header className="h-16 bg-dark-1000 border-b border-white/10 flex items-center px-8 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-light/60" />
          <h1 className="text-lg font-medium text-light">Dashboard</h1>
        </div>
      </header>

      <div className="p-8 space-y-8">
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
