import { IHttpAdapter } from "@/app/adapters/http/IHttpAdapter";
import { nortusHttpAdapter } from "@/app/adapters/http/implementations/nortus/NortusHttpAdapter";

type LoginAPIResponse = {
  access_token: string;
};

type LoginAPIInput = {
  email: string;
  password: string;
};

type LoginUsecaseInput = {
  username: string;
  password: string;
};

type LoginUsecaseOutput = {
  accessToken: string;
};

class AuthUsecase {
  constructor(private readonly httpClient: IHttpAdapter) {}

  async login({ password, username }: LoginUsecaseInput) {
    const response = await this.httpClient.post<
      LoginAPIResponse,
      LoginAPIInput
    >("/auth/login", {
      email: username,
      password,
    });

    if (!response.access_token) {
      throw new Error("Login failed");
    }

    const output: LoginUsecaseOutput = {
      accessToken: response.access_token,
    };

    return output;
  }
}

export const authUsecase = new AuthUsecase(nortusHttpAdapter);
