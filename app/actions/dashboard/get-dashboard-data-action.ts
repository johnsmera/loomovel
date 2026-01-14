"use server";

import { dashboardUsecase } from "@/app/usecases/dashboard/dashboard-usecase";
import { handleUnauthorized, getAuthHeaders } from "@/app/lib/auth";

type DashboardData = Awaited<ReturnType<typeof dashboardUsecase.getDashboardData>>;

type GetDashboardDataActionResult =
  | { success: true; data: DashboardData }
  | { success: false; error: string };

export async function getDashboardDataAction(): Promise<GetDashboardDataActionResult> {
  try {
    const headers = await getAuthHeaders();
    const data = await dashboardUsecase.getDashboardData(headers);

    return {
      success: true,
      data,
    };
  } catch (error) {
    await handleUnauthorized(error);

    const errorMessage =
      error instanceof Error ? error.message : "Erro ao buscar dados do dashboard";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
