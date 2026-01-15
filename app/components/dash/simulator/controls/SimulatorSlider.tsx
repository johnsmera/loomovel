"use client";

import { cn } from "@/app/lib/tailwind_utils";

type SimulatorSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  formatValue: (value: number) => string;
  formatMin: (value: number) => string;
  formatMax: (value: number) => string;
  onChange: (value: number) => void;
};

export function SimulatorSlider({
  label,
  value,
  min,
  max,
  step = 1,
  formatValue,
  formatMin,
  formatMax,
  onChange,
}: SimulatorSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-light/60">{label}:</span>
        <span className="text-sm font-medium text-light">{formatValue(value)}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(
            "w-full h-1.5 rounded-full appearance-none cursor-pointer",
            "bg-white/20",
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:w-4",
            "[&::-webkit-slider-thumb]:h-4",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:bg-primary",
            "[&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(24,118,210,0.5)]",
            "[&::-moz-range-thumb]:w-4",
            "[&::-moz-range-thumb]:h-4",
            "[&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-primary",
            "[&::-moz-range-thumb]:border-none",
            "[&::-moz-range-thumb]:cursor-pointer"
          )}
          style={{
            background: `linear-gradient(to right, #1876D2 0%, #1876D2 ${percentage}%, rgba(255,255,255,0.2) ${percentage}%, rgba(255,255,255,0.2) 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-light/40">
        <span>{formatMin(min)}</span>
        <span>{formatMax(max)}</span>
      </div>
    </div>
  );
}
