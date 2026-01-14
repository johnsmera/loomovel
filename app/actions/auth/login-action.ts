"use server";

import { cookies } from "next/headers";
import { authUsecase } from "@/app/usecases/auth/auth-usecase";
import { tokenStore } from "@/app/lib/token-store";

type LoginActionResult =
  | { success: true; username: string }
  | { success: false; error: string };

export async function loginAction(
  username: string,
  password: string
): Promise<LoginActionResult> {
  try {
    const result = await authUsecase.login({ username, password });

    if (!result.accessToken) {
      return {
        success: false,
        error: "Token de acesso não recebido",
      };
    }

    // Salvar token no servidor (mapeado por username)
    tokenStore.setToken(username, result.accessToken);

    // Salvar apenas o username no cookie (não o token)
    const cookieStore = await cookies();
    cookieStore.set("auth", username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return {
      success: true,
      username,
    };
  } catch (error) {
    console.error(error);
    const errorMessage = "Erro ao realizar login";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
