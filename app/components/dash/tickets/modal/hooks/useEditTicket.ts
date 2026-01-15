"use client";

import { toast } from "sonner";
import { updateTicketAction } from "@/app/actions/tickets/update-ticket-action";
import { type UpdateTicketFormData } from "../updateTicketSchema";

type UseEditTicketOptions = {
  ticketId: string;
  onSuccess?: () => void | Promise<void>;
};

export function useEditTicket({ ticketId, onSuccess }: UseEditTicketOptions) {
  const handleUpdateTicket = async (data: UpdateTicketFormData) => {
    const input = {
      client: data.client,
      email: data.email,
      priority: data.priority,
      responsible: data.responsible,
      subject: data.subject,
      status: data.status,
    };

    const result = await updateTicketAction(ticketId, input);

    if (result.success) {
      toast.success("Ticket atualizado com sucesso!", {
        description: "As alterações foram salvas.",
      });
      await onSuccess?.();
    } else {
      toast.error("Erro ao atualizar ticket", {
        description: result.error,
      });
    }
  };

  return {
    handleUpdateTicket,
  };
}
