"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  updateTicketSchema,
  type UpdateTicketFormData,
} from "../updateTicketSchema";
import { type Ticket } from "@/app/components/dash/tickets/table/types";

// Função auxiliar para converter valores internos para valores da API
function mapPriorityToAPI(priority: string): string {
  const priorityMap: Record<string, string> = {
    urgente: "Urgente",
    media: "Média",
    baixa: "Baixa",
  };
  return priorityMap[priority] || priority;
}

function mapStatusToAPI(status: string): string {
  const statusMap: Record<string, string> = {
    aberto: "Aberto",
    em_andamento: "Em andamento",
    resolvido: "Resolvido",
    fechado: "Fechado",
  };
  return statusMap[status] || status;
}

type UseEditTicketFormOptions = {
  ticket: Ticket | null;
};

export function useEditTicketForm({ ticket }: UseEditTicketFormOptions) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: formHandleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<UpdateTicketFormData>({
    resolver: zodResolver(updateTicketSchema),
    defaultValues: {
      client: "",
      email: "",
      priority: "",
      responsible: "",
      subject: "",
      status: "",
    },
    mode: "onBlur",
  });

  // Preencher formulário quando o ticket mudar
  useEffect(() => {
    if (ticket) {
      reset({
        client: ticket.cliente.nome,
        email: ticket.cliente.email,
        priority: mapPriorityToAPI(ticket.prioridade),
        responsible: ticket.responsavel,
        subject: ticket.assunto,
        status: mapStatusToAPI(ticket.status),
      });
    }
  }, [ticket, reset]);

  const handleSubmit = useCallback(
    (onSubmit: (data: UpdateTicketFormData) => void | Promise<void>) => {
      return formHandleSubmit((data: UpdateTicketFormData) => {
        startTransition(() => {
          (async () => {
            try {
              await onSubmit(data);
            } catch (error) {
              console.error("Update ticket error:", error);
            }
          })();
        });
      });
    },
    [formHandleSubmit]
  );

  const resetForm = useCallback(() => {
    reset();
  }, [reset]);

  return {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    isPending,
    resetForm,
  };
}
