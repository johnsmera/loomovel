"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/app/components/ui/card/Card";
import { CardContent } from "@/app/components/ui/card/CardContent";
import { cn } from "@/app/lib/tailwind_utils";

type KpiResumeCardProps = {
  title: string;
  formattedValue: string;
  variation: number;
  className?: string;
};

export function KpiResumeCard({
  title,
  formattedValue,
  variation,
  className,
}: KpiResumeCardProps) {
  const isPositive = variation >= 0;
  const formattedVariation = Math.abs(variation).toFixed(1);

  return (
    <Card className={cn("transition-all duration-300 ease-out hover:scale-[1.02]", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-light/70 uppercase tracking-wide">
            {title}
          </h3>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-light">{formattedValue}</span>
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium",
                "transition-colors duration-200",
                isPositive
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{formattedVariation}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
