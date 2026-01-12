import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { NortusHttpAdapter } from './NortusHttpAdapter';

interface ApiResponse<T = unknown> {
  data: T;
}

type MockFetch = ReturnType<typeof vi.fn>;

const createMockResponse = <T>(data: T, status = 200): Response => {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: vi.fn().mockResolvedValue(data),
  } as unknown as Response;
};

describe('NortusHttpAdapter', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.clearAllMocks();
  });

  describe('Inicialização', () => {
    it('deve inicializar corretamente sem parâmetros', () => {
      expect(new NortusHttpAdapter()).toBeInstanceOf(NortusHttpAdapter);
    });

    it('deve inicializar corretamente com baseUrl', () => {
      expect(new NortusHttpAdapter('https://api.custom.com')).toBeInstanceOf(NortusHttpAdapter);
    });

    it('deve inicializar corretamente com baseUrl e maxRetries', () => {
      expect(new NortusHttpAdapter('https://api.custom.com', 3)).toBeInstanceOf(NortusHttpAdapter);
    });
  });

  describe('Requisições HTTP', () => {
    it('deve fazer requisição GET', async () => {
      const adapter = new NortusHttpAdapter('https://api.example.com');
      const response = createMockResponse<ApiResponse>({ data: 'get-result' }, 200);
      (global.fetch as MockFetch).mockResolvedValueOnce(response);

      const result = await adapter.get<ApiResponse>('/users');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result).toEqual({ data: 'get-result' });
    });


    it('deve fazer requisição POST com body', async () => {
      const adapter = new NortusHttpAdapter('https://api.example.com');
      const response = createMockResponse<ApiResponse>({ data: 'post-result' }, 200);
      (global.fetch as MockFetch).mockResolvedValueOnce(response);

      const payload = { name: 'John', email: 'john@example.com' };
      const result = await adapter.post<ApiResponse, typeof payload>('/users', payload);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(payload),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result).toEqual({ data: 'post-result' });
    });

    it('deve fazer requisição PUT com body', async () => {
      const adapter = new NortusHttpAdapter('https://api.example.com');
      const response = createMockResponse<ApiResponse>({ data: 'put-result' }, 200);
      (global.fetch as MockFetch).mockResolvedValueOnce(response);

      const payload = { name: 'Jane', email: 'jane@example.com' };
      const result = await adapter.put<ApiResponse, typeof payload>('/users/1', payload);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(payload),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result).toEqual({ data: 'put-result' });
    });

    it('deve fazer requisição DELETE', async () => {
      const adapter = new NortusHttpAdapter('https://api.example.com');
      const response = createMockResponse<ApiResponse>({ data: 'delete-result' }, 200);
      (global.fetch as MockFetch).mockResolvedValueOnce(response);

      const result = await adapter.delete<ApiResponse>('/users/1');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result).toEqual({ data: 'delete-result' });
    });

    it('deve usar URL completa quando fornecida com http/https', async () => {
      const adapter = new NortusHttpAdapter('https://api.example.com');
      const response = createMockResponse<ApiResponse>({ data: 'external-result' }, 200);
      (global.fetch as MockFetch).mockResolvedValueOnce(response);

      await adapter.get<ApiResponse>('https://external-api.com/data');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://external-api.com/data',
        expect.anything()
      );
    });

    it('deve lançar erro quando requisição retorna status não-ok', async () => {
      const adapter = new NortusHttpAdapter('https://api.example.com');
      const errorResponse = createMockResponse<ApiResponse>({ data: 'error' }, 400);
      (global.fetch as MockFetch).mockResolvedValueOnce(errorResponse);

      await expect(adapter.get('/endpoint')).rejects.toThrow('Erro na requisição: 400');
    });
  });

  describe('Retries para Erros Transient', () => {
    it('deve fazer retry quando recebe erro 500', async () => {
      const adapter = new NortusHttpAdapter('https://api.example.com', 1);
      const errorResponse = createMockResponse<ApiResponse>({ data: 'error' }, 500);
      const successResponse = createMockResponse<ApiResponse>({ data: 'success' }, 200);

      (global.fetch as MockFetch)
        .mockResolvedValueOnce(errorResponse)
        .mockResolvedValueOnce(successResponse);

      const result = await adapter.get<ApiResponse>('/endpoint');

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ data: 'success' });
    });


    it('deve respeitar limite de maxRetries', async () => {
      const adapter = new NortusHttpAdapter('https://api.example.com', 1);
      const errorResponse = createMockResponse<ApiResponse>({ data: 'error' }, 500);

      (global.fetch as MockFetch)
        .mockResolvedValueOnce(errorResponse)
        .mockResolvedValueOnce(errorResponse);

      await expect(adapter.get('/endpoint')).rejects.toThrow('Erro na requisição: 500');
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('não deve fazer retry para erros 4xx (client errors)', async () => {
      const adapter = new NortusHttpAdapter('https://api.example.com', 1);
      const errorResponse = createMockResponse<ApiResponse>({ data: 'error' }, 401);

      (global.fetch as MockFetch).mockResolvedValueOnce(errorResponse);

      await expect(adapter.get('/endpoint')).rejects.toThrow('Erro na requisição: 401');
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

  });

  describe('Tratamento de Erros', () => {
    it('deve propagar erros de rede', async () => {
      const adapter = new NortusHttpAdapter('https://api.example.com');
      (global.fetch as MockFetch).mockRejectedValueOnce(new Error('Network error'));

      await expect(adapter.get('/endpoint')).rejects.toThrow('Network error');
    });

    it('deve propagar erros de JSON inválido', async () => {
      const adapter = new NortusHttpAdapter('https://api.example.com');
      const invalidJsonResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      } as unknown as Response;

      (global.fetch as MockFetch).mockResolvedValueOnce(invalidJsonResponse);

      await expect(adapter.get('/endpoint')).rejects.toThrow('Invalid JSON');
    });
  });
});
