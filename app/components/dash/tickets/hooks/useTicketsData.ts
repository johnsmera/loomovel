"use client";

import { useState, useEffect, useCallback } from "react";
import { getTicketsAction } from "@/app/actions/tickets/get-tickets-action";
import { type Ticket } from "@/app/usecases/tickets/tickets-usecase";

type UseTicketsDataState = {
  tickets: Ticket[];
  total: number;
  responsaveis: string[];
  isLoading: boolean;
  error: string | null;
};

type UseTicketsDataReturn = UseTicketsDataState & {
  refetch: () => Promise<void>;
};

const initialState: UseTicketsDataState = {
  tickets: [],
  total: 0,
  responsaveis: [],
  isLoading: true,
  error: null,
};

export function useTicketsData(): UseTicketsDataReturn {
  const [state, setState] = useState<UseTicketsDataState>(initialState);

  const fetchTickets = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await getTicketsAction();

      if (result.success) {
        setState({
          tickets: result.data.tickets,
          total: result.data.total,
          responsaveis: result.data.responsaveis,
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
        err instanceof Error ? err.message : "Erro ao buscar tickets";

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return {
    ...state,
    refetch: fetchTickets,
  };
}
