"use client";

import { SimulatorSlider } from "./SimulatorSlider";
import { CoverageCheckbox } from "./CoverageCheckbox";

type Coverage = {
  id: string;
  label: string;
  price: number;
  checked: boolean;
};

type SimulatorControlsProps = {
  vehicleValue: number;
  clientAge: number;
  coverages: Coverage[];
  onVehicleValueChange: (value: number) => void;
  onClientAgeChange: (value: number) => void;
  onCoverageChange: (id: string, checked: boolean) => void;
};

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function formatAge(value: number): string {
  return `${value} anos`;
}

export function SimulatorControls({
  vehicleValue,
  clientAge,
  coverages,
  onVehicleValueChange,
  onClientAgeChange,
  onCoverageChange,
}: SimulatorControlsProps) {
  return (
    <div className="space-y-6">
      {/* Slider - Valor do veículo */}
      <SimulatorSlider
        label="Valor do veículo"
        value={vehicleValue}
        min={10000}
        max={500000}
        step={1000}
        formatValue={formatCurrency}
        formatMin={formatCurrency}
        formatMax={formatCurrency}
        onChange={onVehicleValueChange}
      />

      {/* Slider - Idade do Cliente */}
      <SimulatorSlider
        label="Idade do Cliente"
        value={clientAge}
        min={18}
        max={90}
        step={1}
        formatValue={formatAge}
        formatMin={formatAge}
        formatMax={formatAge}
        onChange={onClientAgeChange}
      />

      {/* Coberturas Adicionais */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-light/60">Coberturas Adicionais</h4>
        <div className="space-y-3">
          {coverages.map((coverage) => (
            <CoverageCheckbox
              key={coverage.id}
              label={coverage.label}
              price={coverage.price}
              checked={coverage.checked}
              onChange={(checked) => onCoverageChange(coverage.id, checked)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
