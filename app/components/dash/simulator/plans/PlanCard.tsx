"use client";

import { cn } from "@/app/lib/tailwind_utils";

type PlanCardProps = {
  name: string;
  value: number;
  isSelected: boolean;
  isRecommended?: boolean;
  onClick: () => void;
};

export function PlanCard({
  name,
  value,
  isSelected,
  isRecommended = false,
  onClick,
}: PlanCardProps) {
  const formattedValue = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-start p-4 rounded-lg transition-all duration-200",
        "border min-w-[120px]",
        isSelected
          ? "bg-sidebar border-primary"
          : "bg-transparent border-white/20 hover:border-white/40"
      )}
    >
      {isRecommended && (
        <span className="absolute -top-0 right-2 px-2 py-0.5 text-[10px] font-medium rounded bg-emerald-500 text-white">
          Recomendado
        </span>
      )}
      <span
        className={cn(
          "text-xs font-medium",
          isSelected ? "text-primary" : "text-light/60"
        )}
      >
        {name}
      </span>
      <span
        className={cn(
          "text-xl font-bold mt-1",
          isSelected ? "text-light" : "text-light"
        )}
      >
        {formattedValue}
      </span>
      <span className="text-[10px] text-light/40 mt-0.5">Por mês</span>
    </button>
  );
}
