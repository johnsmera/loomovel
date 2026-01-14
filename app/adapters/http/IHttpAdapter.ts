export interface IHttpAdapter {
  get<TResponse>(url: string, options?: RequestInit): Promise<TResponse>;
  post<TResponse, TBody>(url: string, data: TBody, options?: RequestInit): Promise<TResponse>;
  put<TResponse, TBody>(url: string, data: TBody, options?: RequestInit): Promise<TResponse>;
  delete<TResponse>(url: string, options?: RequestInit): Promise<TResponse>;
}
