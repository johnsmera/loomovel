import { IHttpAdapter } from "../../IHttpAdapter";

export class NortusHttpAdapter implements IHttpAdapter {
  private baseUrl: string;
  private readonly maxRetries: number;

  constructor(baseUrl?: string, maxRetries: number = 1) {
    this.baseUrl = baseUrl || "";
    this.maxRetries = maxRetries;
  }

  private async request<TResponse>(
    url: string,
    options: RequestInit = {}
  ): Promise<TResponse> {
    const fullUrl = url.startsWith("http") ? url : `${this.baseUrl}${url}`;

    let response = await fetch(fullUrl, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    let retries = 0;
    const isTransientError = (status: number): boolean =>
      status >= 500 && status < 600;

    while (isTransientError(response.status) && retries < this.maxRetries) {
      response = await fetch(fullUrl, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });
      retries++;
    }

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  async get<TResponse>(url: string, options?: RequestInit): Promise<TResponse> {
    return this.request<TResponse>(url, {
      ...options,
      method: "GET",
    });
  }

  async post<TResponse, TBody>(url: string, data: TBody, options?: RequestInit): Promise<TResponse> {
    return this.request<TResponse>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<TResponse, TBody>(url: string, data: TBody, options?: RequestInit): Promise<TResponse> {
    return this.request<TResponse>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<TResponse>(url: string, options?: RequestInit): Promise<TResponse> {
    return this.request<TResponse>(url, {
      ...options,
      method: "DELETE",
    });
  }
}

export const nortusHttpAdapter = new NortusHttpAdapter(
  process.env.NORTUS_API_URL
);
