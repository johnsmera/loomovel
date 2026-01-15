"use server";

import {
  ticketsUsecase,
  type CreateTicketInput,
  type CreateTicketOutput,
} from "@/app/usecases/tickets/tickets-usecase";
import { handleUnauthorized, getAuthHeaders } from "@/app/lib/auth";

type CreateTicketActionResult =
  | { success: true; data: CreateTicketOutput }
  | { success: false; error: string };

export async function createTicketAction(
  input: CreateTicketInput
): Promise<CreateTicketActionResult> {
  try {
    const headers = await getAuthHeaders();
    const data = await ticketsUsecase.createTicket(input, headers);

    return {
      success: true,
      data,
    };
  } catch (error) {
    await handleUnauthorized(error);

    const errorMessage =
      error instanceof Error ? error.message : "Erro ao criar ticket";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
