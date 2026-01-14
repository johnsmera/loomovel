"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decryptToken } from "./token-crypto";
import { UnauthorizedError } from "./errors";

export async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const encryptedToken = cookieStore.get("token")?.value;

  if (!encryptedToken) {
    return {};
  }

  const token = decryptToken(encryptedToken);

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function handleUnauthorized(
  error: unknown
): Promise<never> {
  if (error instanceof UnauthorizedError) {
    const cookieStore = await cookies();
    
    // Remover cookies (token criptografado e username)
    cookieStore.delete("token");
    cookieStore.delete("auth");
    
    redirect("/");
  }
  // Se não for UnauthorizedError, relança o erro
  throw error;
}
