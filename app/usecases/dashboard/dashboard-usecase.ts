import { IHttpAdapter } from "@/app/adapters/http/IHttpAdapter";
import { nortusHttpAdapter } from "@/app/adapters/http/implementations/nortus/NortusHttpAdapter";

type DashboardAPIResponse = {
  kpisTrend: {
    labels: string[];
    arpuTrend: {
      name: string;
      data: number[];
    };
    conversionTrend: {
      name: string;
      data: number[];
    };
    churnTrend: {
      name: string;
      data: number[];
    };
    retentionTrend: {
      name: string;
      data: number[];
    };
  };
  kpisResume: {
    arpu: {
      valor: number;
      variacao: number;
    };
    conversion: {
      valor: number;
      variacao: number;
    };
    retention: {
      valor: number;
      variacao: number;
    };
    churn: {
      valor: number;
      variacao: number;
    };
  };
  segments: Array<{
    nome: string;
    valor: number;
  }>;
  activeClients: {
    filters: {
      status: string[];
      secureType: string[];
      locations: string[];
    };
    data: Array<{
      id: string;
      name: string;
      email: string;
      secureType: string;
      monthValue: number;
      status: string;
      renewalDate: string;
      location: string;
    }>;
  };
};

type DashboardUsecaseOutput = DashboardAPIResponse;

class DashboardUsecase {
  constructor(private readonly httpClient: IHttpAdapter) {}

  async getDashboardData(
    headers?: Record<string, string>
  ): Promise<DashboardUsecaseOutput> {
    const response = await this.httpClient.get<DashboardAPIResponse>(
      "/nortus-v1/dashboard",
      {
        headers: headers || {},
      }
    );

    return response;
  }
}

export const dashboardUsecase = new DashboardUsecase(nortusHttpAdapter);
