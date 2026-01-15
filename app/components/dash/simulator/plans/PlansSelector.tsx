"use client";

import { type PlanIndicator } from "@/app/usecases/simulator/simulator-usecase";
import { PlanCard } from "./PlanCard";

type PlansSelectorProps = {
  plans: PlanIndicator[];
  selectedPlan: string;
  onSelectPlan: (planName: string) => void;
};

export function PlansSelector({
  plans,
  selectedPlan,
  onSelectPlan,
}: PlansSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-light">Planos personalizados</h3>
      <div className="flex gap-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.name}
            name={plan.name}
            value={plan.value}
            isSelected={selectedPlan === plan.name}
            isRecommended={plan.name === "Premium"}
            onClick={() => onSelectPlan(plan.name)}
          />
        ))}
      </div>
    </div>
  );
}
