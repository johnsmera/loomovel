"use server";

import {
  ticketsUsecase,
  type TicketsUsecaseOutput,
} from "@/app/usecases/tickets/tickets-usecase";
import { handleUnauthorized, getAuthHeaders } from "@/app/lib/auth";

type GetTicketsActionResult =
  | { success: true; data: TicketsUsecaseOutput }
  | { success: false; error: string };

export async function getTicketsAction(): Promise<GetTicketsActionResult> {
  try {
    const headers = await getAuthHeaders();
    const data = await ticketsUsecase.getTickets(headers);

    return {
      success: true,
      data,
    };
  } catch (error) {
    await handleUnauthorized(error);

    const errorMessage =
      error instanceof Error ? error.message : "Erro ao buscar tickets";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
