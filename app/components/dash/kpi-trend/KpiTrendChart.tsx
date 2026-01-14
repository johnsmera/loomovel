"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/app/components/ui/card/Card";
import { CardHeader } from "@/app/components/ui/card/CardHeader";
import { CardTitle } from "@/app/components/ui/card/CardTitle";
import { CardContent } from "@/app/components/ui/card/CardContent";
import { KpiTrendFilters } from "./KpiTrendFilters";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type KpiTrend = {
  labels: string[];
  arpuTrend: {
    name: string;
    data: number[];
  };
  conversionTrend: {
    name: string;
    data: number[];
  };
  churnTrend: {
    name: string;
    data: number[];
  };
  retentionTrend: {
    name: string;
    data: number[];
  };
};

type KpiType = "retenção" | "conversão" | "churn" | "arpu";

type KpiTrendChartProps = {
  data: KpiTrend;
};

function formatArpuValue(value: number): string {
  return `R$ ${(value / 1000).toFixed(1)}k`;
}

function formatPercentageValue(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function KpiTrendChart({ data }: KpiTrendChartProps) {
  const [selectedKpi, setSelectedKpi] = useState<KpiType>("arpu");

  const chartData = useMemo(() => {
    let series;
    let formatter;

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

  const chartOptions = {
    chart: {
      type: "area" as const,
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout" as const,
        speed: 800,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth" as const,
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#14b8a6",
            opacity: 1,
          },
          {
            offset: 100,
            color: "#14b8a6",
            opacity: 0.3,
          },
        ],
      },
    },
    colors: ["#14b8a6"],
    xaxis: {
      categories: data.labels,
      labels: {
        style: {
          colors: "#E0F7FF",
          fontSize: "12px",
        },
      },
      axisBorder: {
        color: "#ffffff1a",
      },
      axisTicks: {
        color: "#ffffff1a",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#E0F7FF",
          fontSize: "12px",
        },
        formatter: chartData.formatter,
      },
    },
    grid: {
      borderColor: "#ffffff1a",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: chartData.formatter,
      },
    },
  };

  return (
    <Card className="transition-all duration-300 ease-out">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Evolução dos KPI&apos;s</CardTitle>
          <KpiTrendFilters
            selectedKpi={selectedKpi}
            onKpiChange={setSelectedKpi}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Chart
          options={chartOptions}
          series={chartData.series}
          type="area"
          height={350}
        />
      </CardContent>
    </Card>
  );
}
