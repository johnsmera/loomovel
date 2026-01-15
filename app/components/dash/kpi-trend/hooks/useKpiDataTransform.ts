"use client";

import { useMemo } from "react";
import type { KpiType } from "./ui/useKpiSelectionUI";
import type { KpiTrend } from "../types";

function formatArpuValue(value: number): string {
  return `R$ ${(value / 1000).toFixed(1)}k`;
}

function formatPercentageValue(value: number): string {
  return `${value.toFixed(1)}%`;
}

type TransformResult = {
  series: Array<{
    name: string;
    data: number[];
  }>;
  formatter: (value: number) => string;
};

export function useKpiDataTransform(
  data: KpiTrend,
  selectedKpi: KpiType
): TransformResult {
  return useMemo(() => {
    let series: number[];
    let formatter: (value: number) => string;

    switch (selectedKpi) {
      case "arpu":
        series = data.arpuTrend.data;
        formatter = formatArpuValue;
        break;
      case "conversão":
        series = data.conversionTrend.data;
        formatter = formatPercentageValue;
        break;
      case "churn":
        series = data.churnTrend.data;
        formatter = formatPercentageValue;
        break;
      case "retenção":
        series = data.retentionTrend.data;
        formatter = formatPercentageValue;
        break;
      default:
        series = data.arpuTrend.data;
        formatter = formatArpuValue;
    }

    return {
      series: [
        {
          name: selectedKpi.charAt(0).toUpperCase() + selectedKpi.slice(1),
          data: series,
        },
      ],
      formatter,
    };
  }, [selectedKpi, data]);
}
