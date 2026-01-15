"use client";

import { useState, useEffect, useCallback } from "react";
import { getSimulatorAction } from "@/app/actions/simulator/get-simulator-action";
import { type SimulatorData } from "@/app/usecases/simulator/simulator-usecase";

type UseSimulatorDataState = {
  data: SimulatorData | null;
  isLoading: boolean;
  error: string | null;
};

type UseSimulatorDataReturn = UseSimulatorDataState & {
  refetch: () => Promise<void>;
};

const initialState: UseSimulatorDataState = {
  data: null,
  isLoading: true,
  error: null,
};

export function useSimulatorData(): UseSimulatorDataReturn {
  const [state, setState] = useState<UseSimulatorDataState>(initialState);

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await getSimulatorAction();

      if (result.success) {
        setState({
          data: result.data,
          isLoading: false,
          error: null,
        });
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: result.error,
        }));
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao buscar dados do simulador";

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}
