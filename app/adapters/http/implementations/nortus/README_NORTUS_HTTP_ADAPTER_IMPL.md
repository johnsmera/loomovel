## Autenticação

A API da Nortus utiliza autenticação via JWT para acesso às rotas protegidas.

Essa responsabilidade é centralizada no HTTP Adapter, que fica encarregado de:
- Realizar o login inicial
- Reutilizar o token nas demais requisições
- Prever a expiração do token e renovar a autenticação quando necessário

Dessa forma, a aplicação não precisa lidar diretamente com lógica de autenticação em cada chamada à API.

### Configurações

As credenciais e URLs de autenticação são definidas via variáveis de ambiente:

- `NORTUS_AUTH_BASE_URL`
- `NORTUS_AUTH_LOGIN_USER`
- `NORTUS_AUTH_LOGIN_PASSWORD`


### Login

**POST** `/auth/login`

Exemplo de payload:

```json
{
  "email": "user@exemplo.com",
  "password": "senha"
}


O retorno é:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Importante:** A API não retorna dados de expiração do token, apenas o token JWT.

## Decisão de Arquitetura

Como a API não retorna informações sobre a expiração do token, existem duas abordagens possíveis:

### Opção 1: Decodificar o JWT
- **Vantagem:** Renovação proativa antes da expiração, evitando requisições com token expirado
- **Desvantagem:** Requer processamento adicional para decodificar o token e extrair o `exp`
- **Dependência:** Biblioteca para decodificar JWT (ex: `jose`, `jsonwebtoken`)

### Opção 2: Detectar 401 e Renovar
- **Vantagem:** Implementação mais simples, sem dependências extras
- **Desvantagem:** Requer uma requisição adicional quando o token expira (latência/rede)
- **Dependência:** Nenhuma

**Decisão:** Optamos pela **Opção 2** (detectar 401 e renovar), pois:
- Simplifica a implementação
- Evita dependências extras
- O overhead de uma requisição adicional é aceitável considerando que tokens JWT geralmente têm tempo de expiração longo
- A renovação acontece apenas quando necessário (lazy renewal)

## Proteção contra Loops Infinitos

### Problema Identificado

Em cenários onde:
- O token está inválido/expirado
- A renovação do token também falha (credenciais inválidas, problema no servidor, etc.)
- Múltiplas requisições simultâneas tentam renovar o token

Pode ocorrer um loop infinito de tentativas de renovação, causando:
- Múltiplas requisições desnecessárias
- Sobrecarga no servidor
- Degradação de performance

### Solução Implementada

Foi implementado um sistema de `maxRetries` que:
- Limita o número de tentativas de renovação por requisição
- Evita loops infinitos mesmo em cenários de falha contínua
- Garante que erros de autenticação sejam propagados corretamente após esgotar as tentativas

**Configuração padrão:** Máximo de 1 retry por requisição (tentativa inicial + 1 renovação)