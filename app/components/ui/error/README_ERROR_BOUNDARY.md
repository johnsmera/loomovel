# Error Boundary com React 19+ e Next.js 15+

Este documento explica o uso de **Error Boundaries** para capturar e tratar erros de forma amigável na aplicação.

## 📚 Conceitos Fundamentais

### Error Boundaries

Error Boundaries são componentes React que capturam erros JavaScript em qualquer lugar da árvore de componentes filhos, registram esses erros e exibem uma UI de fallback em vez da árvore de componentes que quebrou.

**Importante**: Error Boundaries capturam erros durante:
- Renderização
- No lifecycle methods
- Em construtores da árvore abaixo deles

**Não capturam**:
- Erros em event handlers
- Erros em código assíncrono (setTimeout, callbacks, etc)
- Erros durante server-side rendering
- Erros lançados no próprio Error Boundary

## 🎯 Caso de Uso: Tratamento Amigável de Erros

### Problema

Sem Error Boundaries, quando um erro ocorre:
- ❌ Tela em branco ou quebrada
- ❌ Experiência ruim para o usuário
- ❌ Difícil debugar em produção
- ❌ Aplicação pode ficar em estado inconsistente

### Solução com Error Boundary

Com Error Boundaries:
- ✅ UI amigável de erro
- ✅ Opção de retry
- ✅ Logging de erros
- ✅ Isolamento de erros (não quebra toda a aplicação)

## 💻 Implementação

### Exemplo Básico

```tsx
// app/page.tsx
import { ErrorBoundary } from "./components/ui/error/ErrorBoundary";
import { Suspense } from "react";
import { SkeletonCard } from "./components/ui/skeleton/SkeletonCard";
import { MeuComponente } from "./components/MeuComponente";

export default function Home() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SkeletonCard />}>
        <MeuComponente />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### Uso com Fallback Customizado

```tsx
import { ErrorBoundary } from "./components/ui/error/ErrorBoundary";
import { ErrorDisplay } from "./components/ui/error/ErrorDisplay";

export default function Page() {
  return (
    <ErrorBoundary
      fallback={(error, resetErrorBoundary) => (
        <ErrorDisplay error={error} onReset={resetErrorBoundary} />
      )}
    >
      <MeuComponente />
    </ErrorBoundary>
  );
}
```

### Uso com Callbacks

```tsx
<ErrorBoundary
  onError={(error, errorInfo) => {
    // Enviar para serviço de logging
    console.error("Erro capturado:", error, errorInfo);
    // Exemplo: enviar para Sentry, LogRocket, etc
  }}
  onReset={() => {
    // Limpar estado, refazer chamadas, etc
    console.log("Error boundary resetado");
  }}
>
  <MeuComponente />
</ErrorBoundary>
```

## 🏗️ Arquitetura: Error Boundary no Layout

### Layout Global com Error Boundary

Para capturar erros globalmente, você pode envolver o conteúdo no `layout.tsx`:

```tsx
// app/layout.tsx
import { ErrorBoundary } from "./components/ui/error/ErrorBoundary";
import { Suspense } from "react";
import { SkeletonCard } from "./components/ui/skeleton/SkeletonCard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ErrorBoundary>
          <Suspense fallback={<SkeletonCard />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

**⚠️ Atenção**: Error Boundaries no layout capturam erros de toda a aplicação. Use com cuidado e considere boundaries mais específicos para isolar erros.

## 🎨 Componentes de Erro

### ErrorDisplay

Componente padrão para exibir erros de forma amigável:

```tsx
import { ErrorDisplay } from "./components/ui/error/ErrorDisplay";

function MeuErrorFallback({ error, resetErrorBoundary }) {
  return (
    <ErrorDisplay
      error={error}
      onReset={resetErrorBoundary}
      showDetails={true} // Mostra stack trace em desenvolvimento
    />
  );
}
```

### ErrorCard

Componente reutilizável para diferentes tipos de erro:

```tsx
import { ErrorCard } from "./components/ui/error/ErrorCard";

function MeuCardDeErro() {
  return (
    <ErrorCard
      title="Erro ao carregar"
      message="Não foi possível carregar os dados. Tente novamente."
      action={
        <button onClick={handleRetry}>Tentar Novamente</button>
      }
    />
  );
}
```

## 🔄 Integração com Suspense

Error Boundaries devem envolver Suspense boundaries para capturar erros de componentes assíncronos:

```tsx
<ErrorBoundary>
  <Suspense fallback={<SkeletonCard />}>
    <ComponenteAssincrono />
  </Suspense>
</ErrorBoundary>
```

### Múltiplos Boundaries

Você pode ter múltiplos Error Boundaries para diferentes seções:

```tsx
export default function Page() {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<SkeletonCard />}>
          <HeaderAssincrono />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Suspense fallback={<SkeletonText lines={5} />}>
          <ConteudoAssincrono />
        </Suspense>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Suspense fallback={<SkeletonCard showImage />}>
          <GaleriaAssincrona />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
```

## 🎯 Padrões Avançados

### 1. Error Boundary com Retry Inteligente

```tsx
function ComponenteComRetry() {
  const [retryCount, setRetryCount] = useState(0);

  return (
    <ErrorBoundary
      onReset={() => setRetryCount((prev) => prev + 1)}
      fallback={(error, resetErrorBoundary) => (
        <ErrorCard
          title="Erro ao carregar"
          message={`Tentativa ${retryCount + 1} falhou. ${error.message}`}
          action={
            <button onClick={resetErrorBoundary}>
              Tentar Novamente ({retryCount}/3)
            </button>
          }
        />
      )}
    >
      <MeuComponente key={retryCount} />
    </ErrorBoundary>
  );
}
```

### 2. Error Boundary Específico por Tipo

```tsx
function NetworkErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      fallback={(error) => {
        if (error.message.includes("network") || error.message.includes("fetch")) {
          return (
            <ErrorCard
              title="Erro de Conexão"
              message="Verifique sua conexão com a internet."
            />
          );
        }
        return <ErrorDisplay error={error} />;
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

### 3. Error Boundary com Logging

```tsx
<ErrorBoundary
  onError={(error, errorInfo) => {
    // Enviar para serviço de monitoramento
    if (typeof window !== "undefined") {
      // Exemplo com Sentry
      // Sentry.captureException(error, { contexts: { react: errorInfo } });
      
      // Ou simplesmente console em desenvolvimento
      if (process.env.NODE_ENV === "development") {
        console.error("Erro capturado:", error, errorInfo);
      }
    }
  }}
>
  <MeuComponente />
</ErrorBoundary>
```

## ⚡ Boas Práticas

### 1. Granularidade

✅ **Faça**: Use Error Boundaries em pontos estratégicos
```tsx
<ErrorBoundary>
  <Suspense fallback={<SkeletonCard />}>
    <ComponenteCritico />
  </Suspense>
</ErrorBoundary>
```

❌ **Evite**: Error Boundary muito genérico no root
```tsx
// Muito genérico - pode mascarar problemas
<ErrorBoundary>
  <TodaAplicacao />
</ErrorBoundary>
```

### 2. Fallbacks Específicos

✅ **Faça**: Fallbacks que correspondem ao contexto
```tsx
<ErrorBoundary fallback={<ErrorCard title="Erro no card" />}>
  <CardComponent />
</ErrorBoundary>
```

❌ **Evite**: Fallback genérico para tudo
```tsx
<ErrorBoundary fallback={<div>Erro</div>}>
  <QualquerCoisa />
</ErrorBoundary>
```

### 3. Combine com Suspense

✅ **Faça**: Error Boundary envolve Suspense
```tsx
<ErrorBoundary>
  <Suspense fallback={<SkeletonCard />}>
    <ComponenteAssincrono />
  </Suspense>
</ErrorBoundary>
```

### 4. Tratamento de Event Handlers

Error Boundaries **não capturam** erros em event handlers. Use try/catch:

```tsx
function MeuComponente() {
  const handleClick = async () => {
    try {
      await fazerAlgo();
    } catch (error) {
      // Tratar erro do event handler
      console.error(error);
      // Mostrar toast, modal, etc
    }
  };

  return <button onClick={handleClick}>Clique</button>;
}
```

## 🐛 Troubleshooting

### Error Boundary não está capturando erros

- Verifique se o erro está ocorrendo durante renderização (não em event handler)
- Certifique-se de que o Error Boundary está envolvendo o componente que está falhando
- Verifique se não há outro Error Boundary capturando o erro antes

### Erro em Server Components

Error Boundaries **não funcionam** com Server Components. Para erros em Server Components:
- Use `error.tsx` no Next.js App Router
- Trate erros nas funções assíncronas com try/catch
- Use `notFound()` para erros 404

### Reset não está funcionando

- Certifique-se de que está passando a função `resetErrorBoundary` corretamente
- Verifique se o estado do componente foi limpo antes do reset
- Considere usar uma `key` no componente para forçar remontagem

## 📖 Referências

- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Error Boundaries em Server Components](https://nextjs.org/docs/app/api-reference/file-conventions/error)
