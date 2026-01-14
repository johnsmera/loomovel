"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UnauthorizedError } from "./errors";
import { tokenStore } from "./token-store";

export async function handleUnauthorized(
  error: unknown
): Promise<never> {
  if (error instanceof UnauthorizedError) {
    const cookieStore = await cookies();
    const username = cookieStore.get("auth")?.value;
    
    // Remover token do servidor
    if (username) {
      tokenStore.deleteToken(username);
    }
    
    // Remover cookie
    cookieStore.delete("auth");
    redirect("/");
  }
  // Se não for UnauthorizedError, relança o erro
  throw error;
}
