"use client";

import { cn } from "@/app/lib/tailwind_utils";

type BenefitBadgeProps = {
  label: string;
  className?: string;
};

export function BenefitBadge({ label, className }: BenefitBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium",
        "bg-sidebar text-light/80 border border-white/10",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
      {label}
    </span>
  );
}
