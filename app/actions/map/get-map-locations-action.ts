"use server";

import { mapUsecase } from "@/app/usecases/map/map-usecase";
import { handleUnauthorized, getAuthHeaders } from "@/app/lib/auth";

type MapLocationsData = Awaited<ReturnType<typeof mapUsecase.getMapLocations>>;

type GetMapLocationsActionResult =
  | { success: true; data: MapLocationsData }
  | { success: false; error: string };

export async function getMapLocationsAction(): Promise<GetMapLocationsActionResult> {
  try {
    const headers = await getAuthHeaders();
    const data = await mapUsecase.getMapLocations(headers);

    return {
      success: true,
      data,
    };
  } catch (error) {
    await handleUnauthorized(error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro ao buscar localizações do mapa";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
