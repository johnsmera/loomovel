import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { NortusHttpAdapter } from './NortusHttpAdapter';

interface LoginResponse {
  token: string;
}

interface ApiResponse<T = unknown> {
  data: T;
}

type MockFetch = ReturnType<typeof vi.fn>;

/**
 * Cria um mock de Response para testes.
 * 
 * EXCEÇÃO À REGRA: Uso de `unknown` neste contexto é necessário porque:
 * - Estamos criando objetos parciais que simulam a interface Response do DOM
 * - O tipo Response possui muitas propriedades obrigatórias (headers, redirected, type, url, etc.)
 * - Para testes, precisamos apenas das propriedades essenciais (ok, status, statusText, json)
 * - TypeScript não permite conversão direta de objeto parcial para Response completo
 * - A conversão `as unknown as Response` é o padrão recomendado para mocks parciais em TypeScript
 * - Esta é uma prática comum e segura em testes, onde sabemos que apenas as propriedades usadas serão acessadas
 * 
 * Alternativas consideradas e rejeitadas:
 * - Implementar todas as propriedades de Response: over-engineering desnecessário para testes
 * - Usar Partial<Response>: não resolve o problema de tipo, ainda precisaria de cast
 * - Criar interface própria: adiciona complexidade sem benefício real
 */
const createMockResponse = <T>(data: T, status = 200): Response => {
  const statusText = status === 200 ? 'OK' : status === 401 ? 'Unauthorized' : 'Error';
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText,
    json: vi.fn().mockResolvedValue(data),
  } as unknown as Response;
};

const createMockToken = (suffix = '12345'): string => `mock.jwt.token.${suffix}`;

const setupEnvironment = (): void => {
  process.env.NORTUS_AUTH_BASE_URL = 'https://auth.example.com';
  process.env.NORTUS_AUTH_LOGIN_USER = 'user@example.com';
  process.env.NORTUS_AUTH_LOGIN_PASSWORD = 'password123';
};

const createAdapterWithLogin = (baseUrl = 'https://api.example.com', token?: string): NortusHttpAdapter => {
  const mockToken = token ?? createMockToken();
  const mockLoginResponse = createMockResponse<LoginResponse>({ token: mockToken }, 200);
  (global.fetch as MockFetch).mockResolvedValueOnce(mockLoginResponse);
  return new NortusHttpAdapter(baseUrl);
};

describe('NortusHttpAdapter', () => {
  const originalFetch = global.fetch;
  const originalEnv = process.env;

  beforeEach(() => {
    global.fetch = vi.fn();
    setupEnvironment();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    process.env = originalEnv;
    vi.clearAllMocks();
  });

  describe('Inicialização', () => {
    it('deve lançar erro quando variáveis de ambiente obrigatórias não estão configuradas', () => {
      const requiredVars = [
        'NORTUS_AUTH_BASE_URL',
        'NORTUS_AUTH_LOGIN_USER',
        'NORTUS_AUTH_LOGIN_PASSWORD',
      ];

      requiredVars.forEach((varName) => {
        const originalValue = process.env[varName];
        delete process.env[varName];

        expect(() => new NortusHttpAdapter()).toThrow();

        process.env[varName] = originalValue;
      });
    });

    it('deve inicializar corretamente com configurações válidas', () => {
      expect(new NortusHttpAdapter()).toBeInstanceOf(NortusHttpAdapter);
      expect(new NortusHttpAdapter('https://api.custom.com')).toBeInstanceOf(NortusHttpAdapter);
      expect(new NortusHttpAdapter(undefined, 3)).toBeInstanceOf(NortusHttpAdapter);
    });
  });

  describe('Login', () => {
    it('deve realizar login e usar token na primeira requisição', async () => {
      const token = createMockToken();
      const loginResponse = createMockResponse<LoginResponse>({ token }, 200);
      const apiResponse = createMockResponse<ApiResponse>({ data: 'success' }, 200);

      (global.fetch as MockFetch)
        .mockResolvedValueOnce(loginResponse)
        .mockResolvedValueOnce(apiResponse);

      const adapter = new NortusHttpAdapter('https://api.example.com');
      const result = await adapter.get<ApiResponse>('/endpoint');

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenNthCalledWith(
        1,
        'https://auth.example.com/auth/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            email: 'user@example.com',
            password: 'password123',
          }),
        })
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        2,
        'https://api.example.com/endpoint',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${token}`,
          }),
        })
      );
      expect(result).toEqual({ data: 'success' });
    });

    it('deve reutilizar token em requisições subsequentes', async () => {
      const token = createMockToken();
      const adapter = createAdapterWithLogin('https://api.example.com', token);

      const response1 = createMockResponse<ApiResponse>({ data: 'response1' }, 200);
      const response2 = createMockResponse<ApiResponse>({ data: 'response2' }, 200);

      (global.fetch as MockFetch)
        .mockResolvedValueOnce(response1)
        .mockResolvedValueOnce(response2);

      await adapter.get<ApiResponse>('/endpoint1');
      await adapter.get<ApiResponse>('/endpoint2');

      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(global.fetch).toHaveBeenNthCalledWith(
        2,
        'https://api.example.com/endpoint1',
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${token}` }),
        })
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        3,
        'https://api.example.com/endpoint2',
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${token}` }),
        })
      );
    });

    it('deve compartilhar Promise de login em requisições simultâneas', async () => {
      const token = createMockToken();
      let loginCallCount = 0;

      (global.fetch as MockFetch).mockImplementation((url: string | URL) => {
        const urlString = url.toString();
        if (urlString.includes('/auth/login')) {
          loginCallCount++;
          return Promise.resolve(createMockResponse<LoginResponse>({ token }, 200));
        }
        if (urlString.includes('/endpoint1')) {
          return Promise.resolve(createMockResponse<ApiResponse>({ data: 'response1' }, 200));
        }
        return Promise.resolve(createMockResponse<ApiResponse>({ data: 'response2' }, 200));
      });

      const adapter = new NortusHttpAdapter('https://api.example.com');

      await Promise.all([
        adapter.get<ApiResponse>('/endpoint1'),
        adapter.get<ApiResponse>('/endpoint2'),
      ]);

      expect(loginCallCount).toBe(1);
    });

    it('deve lançar erro quando login falha', async () => {
      const errorResponse = createMockResponse<LoginResponse>({ token: '' }, 401);
      (global.fetch as MockFetch).mockResolvedValue(errorResponse);

      const adapter = new NortusHttpAdapter();

      await expect(adapter.get('/endpoint')).rejects.toThrow('Falha no login');
    });

    it('deve lançar erro quando token não é retornado', async () => {
      const loginResponse = createMockResponse<LoginResponse>({ token: '' }, 200);
      (global.fetch as MockFetch).mockResolvedValue(loginResponse);

      const adapter = new NortusHttpAdapter();

      await expect(adapter.get('/endpoint')).rejects.toThrow('Token não recebido');
    });
  });

  describe('Requisições HTTP', () => {
    const token = createMockToken();

    beforeEach(() => {
      createAdapterWithLogin('https://api.example.com', token);
    });

    it('deve fazer requisição GET com autenticação', async () => {
      const adapter = new NortusHttpAdapter('https://api.example.com');
      const response = createMockResponse<ApiResponse>({ data: 'get-result' }, 200);
      (global.fetch as MockFetch).mockResolvedValueOnce(response);

      const result = await adapter.get<ApiResponse>('/users');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Authorization: `Bearer ${token}`,
          }),
        })
      );
      expect(result).toEqual({ data: 'get-result' });
    });

    it('deve fazer requisição POST com body e autenticação', async () => {
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
            Authorization: `Bearer ${token}`,
          }),
        })
      );
      expect(result).toEqual({ data: 'post-result' });
    });

    it('deve fazer requisição PUT com body e autenticação', async () => {
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
            Authorization: `Bearer ${token}`,
          }),
        })
      );
      expect(result).toEqual({ data: 'put-result' });
    });

    it('deve fazer requisição DELETE com autenticação', async () => {
      const adapter = new NortusHttpAdapter('https://api.example.com');
      const response = createMockResponse<ApiResponse>({ data: 'delete-result' }, 200);
      (global.fetch as MockFetch).mockResolvedValueOnce(response);

      const result = await adapter.delete<ApiResponse>('/users/1');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            Authorization: `Bearer ${token}`,
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
      const errorResponse = createMockResponse<ApiResponse>({ data: 'error' }, 500);
      (global.fetch as MockFetch).mockResolvedValueOnce(errorResponse);

      await expect(adapter.get('/endpoint')).rejects.toThrow('Erro na requisição: 500');
    });
  });

  describe('Renovação de Token', () => {
    it('deve renovar token automaticamente quando recebe 401', async () => {
      const oldToken = 'old.token.123';
      const newToken = 'new.token.456';

      const login1 = createMockResponse<LoginResponse>({ token: oldToken }, 200);
      const unauthorized = createMockResponse<ApiResponse>({ data: 'unauthorized' }, 401);
      const login2 = createMockResponse<LoginResponse>({ token: newToken }, 200);
      const success = createMockResponse<ApiResponse>({ data: 'success' }, 200);

      (global.fetch as MockFetch)
        .mockResolvedValueOnce(login1)
        .mockResolvedValueOnce(unauthorized)
        .mockResolvedValueOnce(login2)
        .mockResolvedValueOnce(success);

      const adapter = new NortusHttpAdapter('https://api.example.com', 1);
      const result = await adapter.get<ApiResponse>('/endpoint');

      expect(global.fetch).toHaveBeenCalledTimes(4);
      expect(global.fetch).toHaveBeenNthCalledWith(
        2,
        'https://api.example.com/endpoint',
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${oldToken}` }),
        })
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        4,
        'https://api.example.com/endpoint',
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: `Bearer ${newToken}` }),
        })
      );
      expect(result).toEqual({ data: 'success' });
    });

    it('deve respeitar limite de maxRetries', async () => {
      const token1 = createMockToken('1');
      const token2 = createMockToken('2');

      const login1 = createMockResponse<LoginResponse>({ token: token1 }, 200);
      const unauthorized1 = createMockResponse<ApiResponse>({ data: 'unauthorized' }, 401);
      const login2 = createMockResponse<LoginResponse>({ token: token2 }, 200);
      const unauthorized2 = createMockResponse<ApiResponse>({ data: 'unauthorized' }, 401);

      (global.fetch as MockFetch)
        .mockResolvedValueOnce(login1)
        .mockResolvedValueOnce(unauthorized1)
        .mockResolvedValueOnce(login2)
        .mockResolvedValueOnce(unauthorized2);

      const adapter = new NortusHttpAdapter('https://api.example.com', 1);

      await expect(adapter.get('/endpoint')).rejects.toThrow(
        'Erro de autenticação após 1 tentativa(s) de renovação'
      );
    });

    it('deve lançar erro quando renovação de token falha', async () => {
      const token = createMockToken();
      const login1 = createMockResponse<LoginResponse>({ token }, 200);
      const unauthorized = createMockResponse<ApiResponse>({ data: 'unauthorized' }, 401);
      const loginError = createMockResponse<LoginResponse>({ token: '' }, 500);

      (global.fetch as MockFetch)
        .mockResolvedValueOnce(login1)
        .mockResolvedValueOnce(unauthorized)
        .mockResolvedValueOnce(loginError);

      const adapter = new NortusHttpAdapter('https://api.example.com', 1);

      await expect(adapter.get('/endpoint')).rejects.toThrow();
    });
  });

  describe('Tratamento de Erros', () => {
    it('deve propagar erros de rede', async () => {
      const adapter = createAdapterWithLogin();

      (global.fetch as MockFetch).mockRejectedValueOnce(new Error('Network error'));

      await expect(adapter.get('/endpoint')).rejects.toThrow('Network error');
    });

    it('deve propagar erros de JSON inválido', async () => {
      const adapter = createAdapterWithLogin();
      // EXCEÇÃO: Uso de `unknown` necessário para mock parcial de Response (ver documentação em createMockResponse)
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
