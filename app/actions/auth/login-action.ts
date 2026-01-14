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

    if (!result.accessToken) {
      return {
        success: false,
        error: "Token de acesso não recebido",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set("auth", result.accessToken, {
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
