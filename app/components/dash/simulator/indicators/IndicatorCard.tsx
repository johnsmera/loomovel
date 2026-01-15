"use client";

import { cn } from "@/app/lib/tailwind_utils";

type IndicatorCardProps = {
  name: string;
  conversion: number;
  roi: number;
  value: number;
  className?: string;
};

export function IndicatorCard({
  name,
  conversion,
  roi,
  value,
  className,
}: IndicatorCardProps) {
  const formattedValue = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Determinar cor do ROI baseado no valor
  const roiColor = roi >= 100 ? "text-emerald-400" : "text-gold";

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-xl",
        "bg-sidebar border border-white/10",
        "transition-all duration-200",
        "hover:border-white/20",
        className
      )}
    >
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-light">{name}</h4>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-light/60">
            Conversão: <span className="text-primary">{conversion}%</span>
          </span>
          <span className="text-light/60">
            ROI: <span className={roiColor}>{roi}%</span>
          </span>
        </div>
      </div>
      <span className="text-lg font-bold text-light">{formattedValue}</span>
    </div>
  );
}
