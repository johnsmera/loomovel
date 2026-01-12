import { IHttpAdapter } from "../../IHttpAdapter";

interface LoginResponse {
  token: string;
}

export class NortusHttpAdapter implements IHttpAdapter {
  private baseUrl: string;
  private authBaseUrl: string;
  private loginUser: string;
  private loginPassword: string;
  private token: string | null = null;
  private loginPromise: Promise<void> | null = null;
  private readonly maxRetries: number;

  constructor(baseUrl?: string, maxRetries: number = 1) {
    this.baseUrl = baseUrl || "";
    this.authBaseUrl = process.env.NORTUS_AUTH_BASE_URL || "";
    this.loginUser = process.env.NORTUS_AUTH_LOGIN_USER || "";
    this.loginPassword = process.env.NORTUS_AUTH_LOGIN_PASSWORD || "";
    this.maxRetries = maxRetries;

    if (!this.authBaseUrl) {
      throw new Error("NORTUS_AUTH_BASE_URL não está configurada");
    }
    if (!this.loginUser) {
      throw new Error("NORTUS_AUTH_LOGIN_USER não está configurada");
    }
    if (!this.loginPassword) {
      throw new Error("NORTUS_AUTH_LOGIN_PASSWORD não está configurada");
    }
  }

  /**
   * Realiza o login na API e armazena o token JWT
   * Se já existe uma requisição de login em andamento, retorna a mesma Promise
   * para evitar múltiplos logins simultâneos
   */
  private async login(): Promise<void> {
    // Se já existe uma requisição de login em andamento, aguarda ela
    if (this.loginPromise) {
      return this.loginPromise;
    }

    // Cria a Promise de login e armazena para reutilização
    // Permite que múltiplas chamadas simultâneas compartilhem a mesma Promise
    this.loginPromise = new Promise<void>(async (resolve, reject) => {
      try {
        const response = await fetch(`${this.authBaseUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.loginUser,
            password: this.loginPassword,
          }),
        });

        if (!response.ok) {
          throw new Error(
            `Falha no login: ${response.status} ${response.statusText}`
          );
        }

        const data: LoginResponse = await response.json();

        if (!data.token) {
          throw new Error("Token não recebido na resposta do login");
        }

        this.token = data.token;
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        // Limpa a Promise após conclusão (sucesso ou erro)
        // para permitir novo login se necessário
        this.loginPromise = null;
      }
    });

    return this.loginPromise;
  }

  /**
   * Realiza uma requisição HTTP com autenticação automática
   * Se receber 401, renova o token e tenta novamente (até maxRetries)
   */
  private async request<TResponse>(
    url: string,
    options: RequestInit = {}
  ): Promise<TResponse> {
    // Se não temos token, faz login primeiro
    if (!this.token) {
      await this.login();
    }

    const fullUrl = url.startsWith("http") ? url : `${this.baseUrl}${url}`;

    const makeRequest = async (token: string): Promise<Response> => {
      return fetch(fullUrl, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });
    };

    let retries = 0;
    let response = await makeRequest(this.token!);

    // Se receber 401, tenta renovar o token e fazer retry (até maxRetries)
    while (response.status === 401 && retries < this.maxRetries) {
      this.token = null; // Invalida o token atual
      await this.login();

      response = await makeRequest(this.token!);
      retries++;
    }

    // Se ainda retornar 401 após esgotar as tentativas, lança erro
    if (response.status === 401) {
      throw new Error(
        `Erro de autenticação após ${retries} tentativa(s) de renovação: ${response.status} ${response.statusText}`
      );
    }

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  async get<TResponse>(url: string): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: "GET",
    });
  }

  async post<TResponse, TBody>(
    url: string,
    data: TBody
  ): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<TResponse, TBody>(url: string, data: TBody): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<TResponse>(url: string): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: "DELETE",
    });
  }
}
