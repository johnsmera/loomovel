"use client";

import { cn } from "@/app/lib/tailwind_utils";
import { BenefitBadge } from "./BenefitBadge";

type IncludedBenefitsProps = {
  benefits: string[];
  className?: string;
};

export function IncludedBenefits({ benefits, className }: IncludedBenefitsProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10",
        className
      )}
    >
      <h3 className="text-sm font-medium text-light mb-4">Benefícios Inclusos</h3>
      <div className="flex flex-wrap gap-2">
        {benefits.map((benefit) => (
          <BenefitBadge key={benefit} label={benefit} />
        ))}
      </div>
    </div>
  );
}
