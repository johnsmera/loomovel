"use server";

import {
  ticketsUsecase,
  type UpdateTicketInput,
  type UpdateTicketOutput,
} from "@/app/usecases/tickets/tickets-usecase";
import { handleUnauthorized, getAuthHeaders } from "@/app/lib/auth";

type UpdateTicketActionResult =
  | { success: true; data: UpdateTicketOutput }
  | { success: false; error: string };

export async function updateTicketAction(
  id: string,
  input: UpdateTicketInput
): Promise<UpdateTicketActionResult> {
  try {
    const headers = await getAuthHeaders();
    const data = await ticketsUsecase.updateTicket(id, input, headers);

    return {
      success: true,
      data,
    };
  } catch (error) {
    await handleUnauthorized(error);

    const errorMessage =
      error instanceof Error ? error.message : "Erro ao atualizar ticket";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
