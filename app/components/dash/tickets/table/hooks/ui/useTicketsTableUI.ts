"use client";

import { useState, useCallback, useMemo } from "react";
import { type Ticket, type TicketsFilters, type TicketsPagination } from "../../types";

const DEFAULT_PAGE_SIZE = 10;

type UseTicketsTableUIProps = {
  tickets: Ticket[];
  responsaveis: string[];
  pageSize?: number;
};

type UseTicketsTableUIReturn = {
  // Estado de filtros
  filters: TicketsFilters;
  setSearch: (search: string) => void;
  setFilters: (filters: Partial<TicketsFilters>) => void;
  resetFilters: () => void;

  // Estado de paginação
  pagination: TicketsPagination;
  setPage: (page: number) => void;

  // Dados filtrados e paginados
  filteredTickets: Ticket[];
  paginatedTickets: Ticket[];

  // Colunas da tabela
  columns: { key: string; label: string; width: string }[];
};

const defaultFilters: TicketsFilters = {
  search: "",
  status: "todos",
  prioridade: "todas",
  responsavel: "todos",
};

export function useTicketsTableUI({
  tickets,
  responsaveis,
  pageSize = DEFAULT_PAGE_SIZE,
}: UseTicketsTableUIProps): UseTicketsTableUIReturn {
  const [filters, setFiltersState] = useState<TicketsFilters>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  // Colunas da tabela
  const columns = useMemo(
    () => [
      { key: "id", label: "ID", width: "80px" },
      { key: "prioridade", label: "Prioridade", width: "100px" },
      { key: "cliente", label: "Cliente", width: "1fr" },
      { key: "assunto", label: "Assunto", width: "1.2fr" },
      { key: "status", label: "Status", width: "120px" },
      { key: "criadoEm", label: "Criado em", width: "100px" },
      { key: "responsavel", label: "Responsável", width: "140px" },
      { key: "acoes", label: "Ações", width: "120px" },
    ],
    []
  );

  // Filtrar tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      // Filtro de busca
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          ticket.ticketId.toLowerCase().includes(searchLower) ||
          ticket.cliente.nome.toLowerCase().includes(searchLower) ||
          ticket.cliente.email.toLowerCase().includes(searchLower) ||
          ticket.assunto.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Filtro de status
      if (filters.status !== "todos" && ticket.status !== filters.status) {
        return false;
      }

      // Filtro de prioridade
      if (
        filters.prioridade !== "todas" &&
        ticket.prioridade !== filters.prioridade
      ) {
        return false;
      }

      // Filtro de responsável
      if (
        filters.responsavel !== "todos" &&
        ticket.responsavel !== filters.responsavel
      ) {
        return false;
      }

      return true;
    });
  }, [tickets, filters]);

  // Calcular paginação
  const pagination = useMemo<TicketsPagination>(() => {
    const totalItems = filteredTickets.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    return {
      currentPage: Math.min(currentPage, totalPages),
      totalPages,
      pageSize,
      totalItems,
    };
  }, [filteredTickets.length, pageSize, currentPage]);

  // Tickets paginados
  const paginatedTickets = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredTickets.slice(startIndex, endIndex);
  }, [filteredTickets, pagination.currentPage, pageSize]);

  // Handlers
  const setSearch = useCallback((search: string) => {
    setFiltersState((prev) => ({ ...prev, search }));
    setCurrentPage(1);
  }, []);

  const setFilters = useCallback((newFilters: Partial<TicketsFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters);
    setCurrentPage(1);
  }, []);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    filters,
    setSearch,
    setFilters,
    resetFilters,
    pagination,
    setPage,
    filteredTickets,
    paginatedTickets,
    columns,
  };
}
