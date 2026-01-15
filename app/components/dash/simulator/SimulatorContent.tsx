"use client";

import { cn } from "@/app/lib/tailwind_utils";
import { PageHeader } from "@/app/components/ui/page-header/PageHeader";
import { useSimulatorData } from "./hooks/useSimulatorData";
import { useSimulatorUI } from "./hooks/ui/useSimulatorUI";
import { SimulatorSkeleton } from "./SimulatorSkeleton";
import { PlansSelector } from "./plans/PlansSelector";
import { SimulatorControls } from "./controls/SimulatorControls";
import { IncludedBenefits } from "./benefits/IncludedBenefits";
import { PlansIndicators } from "./indicators/PlansIndicators";

export function SimulatorContent() {
  const { data, isLoading, error } = useSimulatorData();
  const {
    selectedPlan,
    vehicleValue,
    clientAge,
    coverages,
    selectPlan,
    setVehicleValue,
    setClientAge,
    toggleCoverage,
  } = useSimulatorUI();

  if (isLoading) {
    return <SimulatorSkeleton />;
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Erro ao carregar simulador
          </h2>
          <p className="text-red-300/80">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {/* Page Header */}
      <PageHeader>
        <PageHeader.Title>Simulador de Planos</PageHeader.Title>
      </PageHeader>

      <div className="py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Plans & Controls */}
          <div className="lg:col-span-7">
            <div
              className={cn(
                "rounded-xl p-6",
                "bg-white/5 backdrop-blur-md",
                "border border-white/10"
              )}
            >
              {/* Plans Selector */}
              <PlansSelector
                plans={data.plansIndicators}
                selectedPlan={selectedPlan}
                onSelectPlan={selectPlan}
              />

              {/* Divider */}
              <div className="border-t border-white/10 my-6" />

              {/* Controls */}
              <SimulatorControls
                vehicleValue={vehicleValue}
                clientAge={clientAge}
                coverages={coverages}
                onVehicleValueChange={setVehicleValue}
                onClientAgeChange={setClientAge}
                onCoverageChange={toggleCoverage}
              />
            </div>
          </div>

          {/* Right Column - Benefits & Indicators */}
          <div className="lg:col-span-5 space-y-6">
            {/* Included Benefits */}
            <IncludedBenefits benefits={data.includedBenefits} />

            {/* Plans Indicators */}
            <PlansIndicators indicators={data.plansIndicators} />
          </div>
        </div>
      </div>
    </>
  );
}
