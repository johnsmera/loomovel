"use server";

import { cookies } from "next/headers";
import { tokenStore } from "./token-store";

/**
 * Lê o username do cookie e busca o token no servidor.
 * Retorna headers para requisições autenticadas.
 * 
 * @returns Objeto com header Authorization se token existir, ou objeto vazio caso contrário
 * 
 * @example
 * ```typescript
 * // Em um use case ou server action:
 * const headers = await getAuthHeaders();
 * const data = await nortusHttpAdapter.get('/api/users', { headers });
 * ```
 */
export async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const username = cookieStore.get("auth")?.value;
  
  if (!username) {
    return {};
  }
  
  // Buscar token no servidor usando o username
  const token = tokenStore.getToken(username);
  
  if (!token) {
    return {};
  }
  
  return {
    Authorization: `Bearer ${token}`,
  };
}
