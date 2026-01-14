/**
 * Store simples em memória para armazenar tokens no servidor.
 * Mapeia username -> token
 * 
 * Em produção, considere usar Redis ou banco de dados para persistência
 * e suporte a múltiplas instâncias do servidor.
 */
class TokenStore {
  private tokens = new Map<string, string>();

  setToken(username: string, token: string): void {
    this.tokens.set(username, token);
  }

  getToken(username: string): string | undefined {
    return this.tokens.get(username);
  }

  deleteToken(username: string): void {
    this.tokens.delete(username);
  }

  hasToken(username: string): boolean {
    return this.tokens.has(username);
  }
}

// Singleton - uma única instância para toda a aplicação
export const tokenStore = new TokenStore();
