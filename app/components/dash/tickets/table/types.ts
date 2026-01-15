import { type TicketStatus } from "../badges/StatusBadge";
import { type TicketPriority } from "../badges/PriorityBadge";

// Re-exporta o tipo Ticket do usecase para manter compatibilidade
export { type Ticket } from "@/app/usecases/tickets/tickets-usecase";

export type TicketsFilters = {
  search: string;
  status: TicketStatus | "todos";
  prioridade: TicketPriority | "todas";
  responsavel: string | "todos";
};

export type TicketsPagination = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
};
