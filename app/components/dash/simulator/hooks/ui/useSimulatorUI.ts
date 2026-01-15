"use client";

import { useState, useCallback } from "react";

type Coverage = {
  id: string;
  label: string;
  price: number;
  checked: boolean;
};

const initialCoverages: Coverage[] = [
  { id: "roubo", label: "Cobertura contra roubo e furto", price: 25, checked: true },
  { id: "colisao", label: "Danos por colisão", price: 35, checked: true },
  { id: "incendio", label: "Cobertura contra incêndio", price: 20, checked: true },
  { id: "naturais", label: "Fenômenos naturais (granizo, enchente)", price: 30, checked: false },
];

type UseSimulatorUIReturn = {
  selectedPlan: string;
  vehicleValue: number;
  clientAge: number;
  coverages: Coverage[];
  selectPlan: (planName: string) => void;
  setVehicleValue: (value: number) => void;
  setClientAge: (value: number) => void;
  toggleCoverage: (id: string, checked: boolean) => void;
};

export function useSimulatorUI(): UseSimulatorUIReturn {
  const [selectedPlan, setSelectedPlan] = useState("Intermediário");
  const [vehicleValue, setVehicleValue] = useState(50000);
  const [clientAge, setClientAge] = useState(28);
  const [coverages, setCoverages] = useState<Coverage[]>(initialCoverages);

  const selectPlan = useCallback((planName: string) => {
    setSelectedPlan(planName);
  }, []);

  const toggleCoverage = useCallback((id: string, checked: boolean) => {
    setCoverages((prev) =>
      prev.map((coverage) =>
        coverage.id === id ? { ...coverage, checked } : coverage
      )
    );
  }, []);

  return {
    selectedPlan,
    vehicleValue,
    clientAge,
    coverages,
    selectPlan,
    setVehicleValue,
    setClientAge,
    toggleCoverage,
  };
}
