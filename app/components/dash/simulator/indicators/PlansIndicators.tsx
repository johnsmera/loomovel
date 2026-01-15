"use client";

import { cn } from "@/app/lib/tailwind_utils";
import { type PlanIndicator } from "@/app/usecases/simulator/simulator-usecase";
import { IndicatorCard } from "./IndicatorCard";

type PlansIndicatorsProps = {
  indicators: PlanIndicator[];
  className?: string;
};

export function PlansIndicators({ indicators, className }: PlansIndicatorsProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10",
        className
      )}
    >
      <h3 className="text-sm font-medium text-light mb-4">Indicadores</h3>
      <div className="space-y-3">
        {indicators.map((indicator) => (
          <IndicatorCard
            key={indicator.name}
            name={indicator.name}
            conversion={indicator.conversion}
            roi={indicator.roi}
            value={indicator.value}
          />
        ))}
      </div>
    </div>
  );
}
