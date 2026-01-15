"use client";

import { useState } from "react";

export type KpiType = "retenção" | "conversão" | "churn" | "arpu";

export function useKpiSelectionUI(defaultKpi: KpiType = "arpu") {
  const [selectedKpi, setSelectedKpi] = useState<KpiType>(defaultKpi);

  return {
    selectedKpi,
    setSelectedKpi,
  };
}
