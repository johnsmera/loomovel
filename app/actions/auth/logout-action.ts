"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { tokenStore } from "@/app/lib/token-store";

export async function logoutAction(): Promise<void> {
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
