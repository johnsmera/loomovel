# Loomovel

Projeto Next.js com foco em dashboard e fluxos protegidos.

## Requisitos

- Node.js LTS
- pnpm

## Rodar local

```bash
pnpm dev
```

## Padrões e arquitetura

- **Composite**: composição de componentes atômicos.
- **Stateless**: preferência por componentes funcionais puros.
- **Adapter Pattern**: camada HTTP isolada para integrações externas.

## HTTP Adapter (Nortus)

- Adapter HTTP simples sem autenticação.
- Permite mockar requisições em testes sem tocar no `fetch`.
- Suporte a `GET`, `POST`, `PUT`, `DELETE` com retries para 5xx.
- `baseUrl` opcional e `maxRetries` configurável.

## Error Boundary

- Captura erros de renderização e lifecycle no client.
- Não captura erros em handlers, async fora do React, SSR ou no próprio boundary.
- Use fallbacks específicos e boundaries granulares.
- Para Server Components, use `error.tsx`.

## Suspense

- Uso com Server Components assíncronos.
- Fallbacks alinhados ao layout (skeletons).
- Boundaries por seção para carregamento progressivo.
- Suspense no layout é útil, mas não substitui boundaries locais.

## Desenvolvimento

Fluxo segue Git Flow, sem PRs formais por ser repositório individual.
