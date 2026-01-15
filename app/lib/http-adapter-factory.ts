"use server";

import { cookies } from "next/headers";
import { nortusHttpAdapter } from "../@adapters/http/implementations/nortus/NortusHttpAdapter";
import { UnauthorizedError } from "./errors";

async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth")?.value;

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}