"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UnauthorizedError } from "./errors";

export async function handleUnauthorized(
  error: unknown
): Promise<never> {
  if (error instanceof UnauthorizedError) {
    const cookieStore = await cookies();
    cookieStore.delete("auth");
    redirect("/");
  }
  // Se não for UnauthorizedError, relança o erro
  throw error;
}
