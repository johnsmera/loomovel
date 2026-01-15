"use server";

import { cookies } from "next/headers";

export async function getUsernameAction(): Promise<string | null> {
  const cookieStore = await cookies();
  const username = cookieStore.get("auth")?.value;
  
  return username || null;
}
