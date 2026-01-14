"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  
  // Remover cookies
  cookieStore.delete("token");
  cookieStore.delete("auth");
  
  redirect("/");
}
