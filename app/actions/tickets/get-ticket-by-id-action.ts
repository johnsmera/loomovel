"use server";

import {
  ticketsUsecase,
  type Ticket,
} from "@/app/usecases/tickets/tickets-usecase";
import { handleUnauthorized, getAuthHeaders } from "@/app/lib/auth";

type GetTicketByIdActionResult =
  | { success: true; data: Ticket }
  | { success: false; error: string };

export async function getTicketByIdAction(
  id: string
): Promise<GetTicketByIdActionResult> {
  try {
    const headers = await getAuthHeaders();
    const data = await ticketsUsecase.getTicketById(id, headers);

    return {
      success: true,
      data,
    };
  } catch (error) {
    await handleUnauthorized(error);

    const errorMessage =
      error instanceof Error ? error.message : "Erro ao buscar ticket";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
