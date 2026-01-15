import { IHttpAdapter } from "@/app/@adapters/http/IHttpAdapter";
import { nortusHttpAdapter } from "@/app/@adapters/http/implementations/nortus/NortusHttpAdapter";

// Tipos da resposta da API
type PlanIndicatorAPI = {
  name: string;
  conversion: number;
  roi: number;
  value: number;
};

type SimulatorAPIResponse = {
  includedBenefits: string[];
  plansIndicators: PlanIndicatorAPI[];
};

// Tipos internos da aplicação
export type PlanIndicator = {
  name: string;
  conversion: number;
  roi: number;
  value: number;
};

export type SimulatorData = {
  includedBenefits: string[];
  plansIndicators: PlanIndicator[];
};

// Mapeadores
function mapPlanIndicator(apiIndicator: PlanIndicatorAPI): PlanIndicator {
  return {
    name: apiIndicator.name,
    conversion: apiIndicator.conversion,
    roi: apiIndicator.roi,
    value: apiIndicator.value,
  };
}

function mapSimulatorData(apiData: SimulatorAPIResponse): SimulatorData {
  return {
    includedBenefits: apiData.includedBenefits,
    plansIndicators: apiData.plansIndicators.map(mapPlanIndicator),
  };
}

class SimulatorUsecase {
  constructor(private readonly httpClient: IHttpAdapter) {}

  async getSimulatorData(
    headers?: Record<string, string>
  ): Promise<SimulatorData> {
    const response = await this.httpClient.get<SimulatorAPIResponse>(
      "/nortus-v1/simulador-planos",
      { headers: headers || {} }
    );

    return mapSimulatorData(response);
  }
}

export const simulatorUsecase = new SimulatorUsecase(nortusHttpAdapter);
