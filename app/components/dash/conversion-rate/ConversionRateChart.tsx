"use client";

import dynamic from "next/dynamic";
import { Card } from "@/app/components/ui/card/Card";
import { CardHeader } from "@/app/components/ui/card/CardHeader";
import { CardTitle } from "@/app/components/ui/card/CardTitle";
import { CardContent } from "@/app/components/ui/card/CardContent";
import { ChevronRight } from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ConversionTrend = {
  name: string;
  data: number[];
};

type ConversionRateChartProps = {
  labels: string[];
  conversionTrend: ConversionTrend;
};

export function ConversionRateChart({
  labels,
  conversionTrend,
}: ConversionRateChartProps) {
  const chartOptions = {
    chart: {
      type: "bar" as const,
      height: 350,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout" as const,
        speed: 800,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "60%",
        dataLabels: {
          position: "top" as const,
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        colors: ["#E0F7FF"],
        fontSize: "12px",
        fontWeight: 600,
      },
      formatter: (val: number) => `${val}`,
    },
    colors: ["#14b8a6"],
    xaxis: {
      categories: labels,
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
      },
    },
    grid: {
      borderColor: "#ffffff1a",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val: number) => `${val} novos clientes`,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#0d9488"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100],
      },
    },
  };

  const chartSeries = [
    {
      name: "Novos Clientes",
      data: conversionTrend.data,
    },
  ];

  return (
    <Card className="transition-all duration-300 ease-out">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Taxa de conversão</CardTitle>
          <ChevronRight className="w-5 h-5 text-light/50" />
        </div>
      </CardHeader>
      <CardContent>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </CardContent>
    </Card>
  );
}
