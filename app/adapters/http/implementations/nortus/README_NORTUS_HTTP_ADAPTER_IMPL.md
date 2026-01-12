# NortusHttpAdapter

Adapter HTTP simples para realizar requisições à API Nortus. Este adapter não gerencia autenticação - essa responsabilidade é de outra camada da aplicação.

## Motivação

A criação deste adapter HTTP segue o padrão **Adapter Pattern** e tem como principais motivações:

### Testabilidade

**Principal benefício**: O adapter permite **mockar facilmente requisições HTTP em testes**, isolando a lógica de negócio das chamadas de rede.

Exemplo de teste simplificado:
```typescript
// Mock do adapter em vez de mockar fetch globalmente
const mockAdapter = {
  get: vi.fn().mockResolvedValue({ data: 'test' })
};
```

### Abstração e Flexibilidade

- **Abstração**: Encapsula detalhes de implementação HTTP (fetch, headers, retries)
- **Flexibilidade**: Permite trocar a implementação HTTP sem impactar o código que usa o adapter
- **Reutilização**: Lógica de retries e tratamento de erros centralizada

### Manutenibilidade

- **Responsabilidade única**: Foca apenas em comunicação HTTP
- **Código testado**: Lógica de retries e tratamento de erros é coberta por testes específicos
- **Evolução**: Facilita adicionar funcionalidades (timeout, interceptors, etc.) sem impactar o restante da aplicação

## Características

- Implementa métodos HTTP básicos (GET, POST, PUT, DELETE)
- Suporte a retries automáticos para erros transient (5xx)
- Não possui lógica de autenticação interna

## Uso

### Inicialização

```typescript
import { NortusHttpAdapter } from './NortusHttpAdapter';

// Com baseUrl
const adapter = new NortusHttpAdapter('https://api.example.com');

// Com baseUrl e maxRetries
const adapter = new NortusHttpAdapter('https://api.example.com', 3);
```

### Parâmetros do Construtor

- `baseUrl` (opcional): URL base da API. Se não fornecido, será uma string vazia.
- `maxRetries` (opcional, padrão: 1): Número máximo de tentativas para erros transient (5xx).

### Autenticação

O adapter **não gerencia autenticação**. A autenticação é gerenciada em outra camada da aplicação através de cookies. O adapter apenas realiza as requisições HTTP sem se preocupar com autenticação.

## Métodos HTTP

### GET

```typescript
const result = await adapter.get<ResponseType>('/endpoint');
```

### POST

```typescript
const payload = { name: 'John', email: 'john@example.com' };
const result = await adapter.post<ResponseType, typeof payload>('/users', payload);
```

### PUT

```typescript
const payload = { name: 'Jane', email: 'jane@example.com' };
const result = await adapter.put<ResponseType, typeof payload>('/users/1', payload);
```

### DELETE

```typescript
const result = await adapter.delete<ResponseType>('/users/1');
```

## Retries Automáticos

O adapter realiza retries automáticos para erros transient (5xx). O número máximo de retries é configurado via parâmetro `maxRetries` no construtor (padrão: 1). Erros 4xx não são retentados.

## URLs

URLs que começam com `http://` ou `https://` são usadas como estão. Caso contrário, são concatenadas com o `baseUrl`.

## Tratamento de Erros

O adapter lança erros para status não-ok, erros de rede ou falhas ao parsear JSON.
