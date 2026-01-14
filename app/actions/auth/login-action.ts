"use server";

import { cookies } from "next/headers";
import { authUsecase } from "@/app/usecases/auth/auth-usecase";

type LoginActionResult =
  | { success: true; username: string }
  | { success: false; error: string };

export async function loginAction(
  username: string,
  password: string
): Promise<LoginActionResult> {
  try {
    const result = await authUsecase.login({ username, password });

    if (!result.encryptedToken) {
      return {
        success: false,
        error: "Token de acesso não recebido",
      };
    }

    // Salvar token criptografado no cookie (já vem criptografado do usecase)
    const cookieStore = await cookies();
    
    cookieStore.set("token", result.encryptedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    // Salvar username também para referência
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
