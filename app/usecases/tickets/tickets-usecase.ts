import { IHttpAdapter } from "@/app/@adapters/http/IHttpAdapter";
import { nortusHttpAdapter } from "@/app/@adapters/http/implementations/nortus/NortusHttpAdapter";
import { type TicketStatus } from "@/app/components/dash/tickets/badges/StatusBadge";
import { type TicketPriority } from "@/app/components/dash/tickets/badges/PriorityBadge";

// Tipos da resposta da API
type TicketAPIItem = {
  id: string;
  ticketId: string;
  priority: string;
  client: string;
  email: string;
  subject: string;
  status: string;
  responsible: string;
  createdAt: string;
  updatedAt: string;
};

type TicketsAPIResponse = {
  data: TicketAPIItem[];
  total: number;
};

// Tipos para criação de ticket
export type CreateTicketInput = {
  ticketId: string;
  priority: string;
  client: string;
  email: string;
  subject: string;
  status: string;
  responsible: string;
};

export type CreateTicketOutput = {
  id: string;
  ticketId: string;
  priority: string;
  client: string;
  email: string;
  subject: string;
  status: string;
  responsible: string;
  createdAt: string;
  updatedAt: string;
};

// Tipos para atualização de ticket
export type UpdateTicketInput = {
  priority?: string;
  client?: string;
  email?: string;
  subject?: string;
  status?: string;
  responsible?: string;
};

export type UpdateTicketOutput = {
  id: string;
  ticketId: string;
  priority: string;
  client: string;
  email: string;
  subject: string;
  status: string;
  responsible: string;
  createdAt: string;
  updatedAt: string;
};

// Tipos internos da aplicação
export type Ticket = {
  id: string; // ID real da API (usado para PATCH/DELETE)
  ticketId: string; // Identificador do ticket (exibido na UI)
  prioridade: TicketPriority;
  cliente: {
    nome: string;
    email: string;
  };
  assunto: string;
  status: TicketStatus;
  criadoEm: string;
  responsavel: string;
};

export type TicketsUsecaseOutput = {
  tickets: Ticket[];
  total: number;
  responsaveis: string[];
};

// Mapeadores
function mapPriority(priority: string): TicketPriority {
  const priorityMap: Record<string, TicketPriority> = {
    urgente: "urgente",
    média: "media",
    media: "media",
    baixa: "baixa",
  };

  return priorityMap[priority.toLowerCase()] || "media";
}

function mapStatus(status: string): TicketStatus {
  const statusMap: Record<string, TicketStatus> = {
    aberto: "aberto",
    fechado: "fechado",
    "em andamento": "em_andamento",
    resolvido: "resolvido",
  };

  return statusMap[status.toLowerCase()] || "aberto";
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function mapTicket(apiTicket: TicketAPIItem): Ticket {
  return {
    id: apiTicket.id, // ID real da API
    ticketId: apiTicket.ticketId, // Identificador do ticket
    prioridade: mapPriority(apiTicket.priority),
    cliente: {
      nome: apiTicket.client,
      email: apiTicket.email,
    },
    assunto: apiTicket.subject,
    status: mapStatus(apiTicket.status),
    criadoEm: formatDate(apiTicket.createdAt),
    responsavel: apiTicket.responsible,
  };
}

function extractUniqueResponsaveis(tickets: Ticket[]): string[] {
  const responsaveisSet = new Set(tickets.map((ticket) => ticket.responsavel));
  return Array.from(responsaveisSet).sort();
}

class TicketsUsecase {
  constructor(private readonly httpClient: IHttpAdapter) {}

  async getTickets(
    headers?: Record<string, string>
  ): Promise<TicketsUsecaseOutput> {
    const response = await this.httpClient.get<TicketsAPIResponse>("/tickets", {
      headers: headers || {},
    });

    const tickets = response.data.map(mapTicket);
    const responsaveis = extractUniqueResponsaveis(tickets);

    return {
      tickets,
      total: response.total,
      responsaveis,
    };
  }

  async createTicket(
    input: CreateTicketInput,
    headers?: Record<string, string>
  ): Promise<CreateTicketOutput> {
    const response = await this.httpClient.post<CreateTicketOutput, CreateTicketInput>(
      "/tickets",
      input,
      { headers: headers || {} }
    );

    return response;
  }

  async getTicketById(
    id: string,
    headers?: Record<string, string>
  ): Promise<Ticket> {
    const response = await this.httpClient.get<TicketAPIItem>(
      `/tickets/${id}`,
      { headers: headers || {} }
    );

    return mapTicket(response);
  }

  async updateTicket(
    id: string,
    input: UpdateTicketInput,
    headers?: Record<string, string>
  ): Promise<UpdateTicketOutput> {
    const response = await this.httpClient.patch<UpdateTicketOutput, UpdateTicketInput>(
      `/tickets/${id}`,
      input,
      { headers: headers || {} }
    );

    return response;
  }
}

export const ticketsUsecase = new TicketsUsecase(nortusHttpAdapter);
