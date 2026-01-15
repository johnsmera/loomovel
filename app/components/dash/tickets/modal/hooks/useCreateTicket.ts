"use client";

import { toast } from "sonner";
import { createTicketAction } from "@/app/actions/tickets/create-ticket-action";
import { type CreateTicketFormData } from "../createTicketSchema";

type UseCreateTicketOptions = {
  onSuccess?: () => void | Promise<void>;
};

function generateTicketId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `TKT-${timestamp}-${random}`.toUpperCase();
}

export function useCreateTicket(options?: UseCreateTicketOptions) {
  const handleCreateTicket = async (data: CreateTicketFormData) => {
    const input = {
      ticketId: generateTicketId(),
      priority: data.priority,
      client: data.client,
      email: data.email,
      subject: data.subject,
      status: "Aberto",
      responsible: data.responsible,
    };

    const result = await createTicketAction(input);

    if (result.success) {
      toast.success("Ticket criado com sucesso!", {
        description: "O ticket foi criado e já está na sua lista.",
      });
      await options?.onSuccess?.();
    } else {
      toast.error("Erro ao criar ticket", {
        description: result.error,
      });
    }
  };

  return {
    handleCreateTicket,
  };
}
