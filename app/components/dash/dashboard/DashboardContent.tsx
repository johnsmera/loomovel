import { getDashboardDataAction } from "@/app/actions/dashboard/get-dashboard-data-action";
import { getMapLocationsAction } from "@/app/actions/map/get-map-locations-action";
import { KpiTrendChart } from "@/app/components/dash/kpi-trend/KpiTrendChart";
import { ConversionRateChart } from "@/app/components/dash/conversion-rate/ConversionRateChart";
import { CustomerMap } from "@/app/components/dash/customer-map/CustomerMap";

export async function DashboardContent() {
  const [dashboardResult, mapResult] = await Promise.all([
    getDashboardDataAction(),
    getMapLocationsAction(),
  ]);

  if (!dashboardResult.success) {
    return (
      <div className="p-8">
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Erro ao carregar dados
          </h2>
          <p className="text-red-300/80">{dashboardResult.error}</p>
        </div>
      </div>
    );
  }

  const { data } = dashboardResult;
  const mapData = mapResult.success ? mapResult.data : null;

  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <KpiTrendChart data={data.kpisTrend} />
        </div>
        <div className="lg:col-span-4">
          <ConversionRateChart
            labels={data.kpisTrend.labels.slice(-6)}
            conversionTrend={{
              name: data.kpisTrend.conversionTrend.name,
              data: data.kpisTrend.conversionTrend.data.slice(-6),
            }}
          />
        </div>
      </div>

      <CustomerMap
        data={data.activeClients}
        mapLocations={mapData?.locations || []}
      />
    </div>
  );
}
