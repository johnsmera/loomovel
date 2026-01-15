"use server";

import {
  simulatorUsecase,
  type SimulatorData,
} from "@/app/usecases/simulator/simulator-usecase";
import { handleUnauthorized, getAuthHeaders } from "@/app/lib/auth";

type GetSimulatorActionResult =
  | { success: true; data: SimulatorData }
  | { success: false; error: string };

export async function getSimulatorAction(): Promise<GetSimulatorActionResult> {
  try {
    const headers = await getAuthHeaders();
    const data = await simulatorUsecase.getSimulatorData(headers);

    return {
      success: true,
      data,
    };
  } catch (error) {
    await handleUnauthorized(error);

    const errorMessage =
      error instanceof Error ? error.message : "Erro ao buscar dados do simulador";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
