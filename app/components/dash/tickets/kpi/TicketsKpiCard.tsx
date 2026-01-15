"use client";

import { type ReactNode } from "react";
import { cn } from "@/app/lib/tailwind_utils";

type TicketsKpiCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconColor?: string;
  className?: string;
};

export function TicketsKpiCard({
  title,
  value,
  icon,
  iconColor = "text-primary",
  className,
}: TicketsKpiCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10",
        "transition-all duration-200 ease-out",
        "hover:bg-white/10 hover:border-white/20",
        "p-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-light/60">{title}</span>
          <span className="text-3xl font-bold text-light">{value}</span>
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            "bg-white/5",
            iconColor
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
