"use client";

import { cn } from "@/app/lib/tailwind_utils";
import { Check } from "lucide-react";

type CoverageCheckboxProps = {
  label: string;
  price: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function CoverageCheckbox({
  label,
  price,
  checked,
  onChange,
}: CoverageCheckboxProps) {
  const formattedPrice = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-5 h-5 rounded flex items-center justify-center transition-all duration-200",
            "border",
            checked
              ? "bg-primary border-primary"
              : "bg-transparent border-white/30 group-hover:border-white/50"
          )}
        >
          {checked && <Check className="w-3.5 h-3.5 text-white" />}
        </div>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span className="text-sm text-light/80">{label}</span>
      </div>
      <span className="text-sm text-primary">+ {formattedPrice}</span>
    </label>
  );
}
