import { IHttpAdapter } from "@/app/adapters/http/IHttpAdapter";
import { nortusHttpAdapter } from "@/app/adapters/http/implementations/nortus/NortusHttpAdapter";

export type MapLocation = {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number]; // [latitude, longitude]
  category: string;
  address: string;
  icon: string;
  color: string;
};

type MapLocationsAPIResponse = {
  data: {
    locations: MapLocation[];
  };
};

type MapUsecaseOutput = {
  locations: MapLocation[];
};

class MapUsecase {
  constructor(private readonly httpClient: IHttpAdapter) {}

  async getMapLocations(
    headers?: Record<string, string>
  ): Promise<MapUsecaseOutput> {
    try {
      const response = await this.httpClient.get<MapLocationsAPIResponse>(
        "/map/locations",
        {
          headers: headers || {},
        }
      );

      return {
        locations: response.data.locations || [],
      };
    } catch (error) {
      // Se a API retornar erro ou não existir, retornar array vazio
      // para que o mapa mostre todos os dados padrão
      console.warn("Erro ao buscar localizações do mapa:", error);
      return {
        locations: [],
      };
    }
  }
}

export const mapUsecase = new MapUsecase(nortusHttpAdapter);
