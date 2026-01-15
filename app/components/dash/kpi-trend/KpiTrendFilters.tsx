"use client";

import { cn } from "@/app/lib/tailwind_utils";
import type { KpiType } from "./hooks/ui/useKpiSelectionUI";

type KpiTrendFiltersProps = {
  selectedKpi: KpiType;
  onKpiChange: (kpi: KpiType) => void;
  className?: string;
};

const kpiOptions: Array<{ value: KpiType; label: string }> = [
  { value: "retenção", label: "Retenção" },
  { value: "conversão", label: "Conversão" },
  { value: "churn", label: "Churn" },
  { value: "arpu", label: "ARPU" },
];

export function KpiTrendFilters({
  selectedKpi,
  onKpiChange,
  className,
}: KpiTrendFiltersProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {kpiOptions.map((option) => {
        const isSelected = selectedKpi === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onKpiChange(option.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium",
              "transition-all duration-200 ease-out",
              "border",
              isSelected
                ? "bg-teal-500/20 border-teal-500/50 text-teal-400"
                : "bg-white/5 border-white/10 text-light/70 hover:bg-white/10 hover:text-light"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
