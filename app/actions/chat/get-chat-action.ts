"use server";

import {
  chatUsecase,
  type ChatUsecaseOutput,
} from "@/app/usecases/chat/chat-usecase";
import { handleUnauthorized, getAuthHeaders } from "@/app/lib/auth";

type GetChatActionResult =
  | { success: true; data: ChatUsecaseOutput }
  | { success: false; error: string };

export async function getChatAction(): Promise<GetChatActionResult> {
  try {
    const headers = await getAuthHeaders();
    const data = await chatUsecase.getChat(headers);

    return {
      success: true,
      data,
    };
  } catch (error) {
    await handleUnauthorized(error);

    const errorMessage =
      error instanceof Error ? error.message : "Erro ao buscar dados do chat";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
