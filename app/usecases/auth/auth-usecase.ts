import { IHttpAdapter } from "@/app/adapters/http/IHttpAdapter";
import { nortusHttpAdapter } from "@/app/adapters/http/implementations/nortus/NortusHttpAdapter";
import { IEncrypterAdapter } from "@/app/adapters/encrypter/IEncrypterAdapter";
import { tokenEncrypterAdapter } from "@/app/adapters/encrypter/implementations/TokenEncrypterAdapter";

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
  encryptedToken: string;
};

class AuthUsecase {
  constructor(
    private readonly httpClient: IHttpAdapter,
    private readonly encrypter: IEncrypterAdapter
  ) {}

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

    const encryptedToken = this.encrypter.encrypt(response.access_token);

    const output: LoginUsecaseOutput = {
      encryptedToken,
    };

    return output;
  }
}

export const authUsecase = new AuthUsecase(nortusHttpAdapter, tokenEncrypterAdapter);
