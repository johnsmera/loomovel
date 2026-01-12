# Suspense com React 20+ e Next.js 15+ Server Components

Este documento explica o uso avançado de **Suspense** combinado com **Server Components assíncronos** no React 20+ e Next.js 15+.

## 📚 Conceitos Fundamentais

### Server Components Assíncronos

No Next.js 15+ com React 20+, você pode criar componentes assíncronos diretamente no servidor:

```tsx
async function MeuComponente() {
  const dados = await fetch('https://api.exemplo.com/dados');
  return <div>{dados}</div>;
}
```

### Suspense Boundaries

O `Suspense` permite definir estados de loading enquanto componentes assíncronos estão carregando:

```tsx
<Suspense fallback={<Loading />}>
  <MeuComponenteAssincrono />
</Suspense>
```

## 🎯 Caso de Uso: API Legada com Loading Inteligente

### Problema

APIs legadas geralmente têm latência alta. Sem Suspense, você teria:

- ❌ Tela em branco durante o carregamento
- ❌ Necessidade de gerenciar estados de loading manualmente
- ❌ Experiência de usuário ruim

### Solução com Suspense + Server Components

Com Suspense e Server Components assíncronos:

- ✅ UI fluida com skeletons durante o carregamento
- ✅ Gerenciamento automático de estados
- ✅ Melhor experiência do usuário

## 💻 Implementação

### Exemplo Básico

```tsx
// app/components/MeuComponente.tsx
async function ConteudoAssincrono() {
  // Simula chamada para API legada
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  return (
    <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-2">Conteúdo Carregado!</h2>
      <p className="text-gray-300">
        Este conteúdo foi carregado após 2 segundos.
      </p>
    </div>
  );
}

export function MeuComponente() {
  return <ConteudoAssincrono />;
}
```

### Uso com Suspense

```tsx
// app/page.tsx
import { Suspense } from "react";
import { SkeletonCard } from "./components/ui/skeleton/SkeletonCard";
import { MeuComponente } from "./components/MeuComponente";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Bem-vindo</h1>
      
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} showImage showAvatar lines={3} />
            ))}
          </div>
        }
      >
        <MeuComponente />
      </Suspense>
    </div>
  );
}
```

## 🏗️ Arquitetura: Suspense no Layout

### Layout Global com Suspense

Para aplicar Suspense globalmente, você pode envolvê-lo no `layout.tsx`:

```tsx
// app/layout.tsx
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
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} showImage showAvatar lines={3} />
              ))}
            </div>
          }
        >
          {children}
        </Suspense>
      </body>
    </html>
  );
}
```

**⚠️ Atenção**: Suspense no layout captura apenas componentes assíncronos diretos. Para componentes aninhados, você precisa de boundaries adicionais.

## 🎨 Componente Reutilizável: SuspenseBoundary

Para facilitar o uso, criamos um componente wrapper:

```tsx
// app/components/ui/suspense/SuspenseBoundary.tsx
import { Suspense, ReactNode } from "react";
import { SkeletonCard } from "../skeleton/SkeletonCard";

export interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function SuspenseBoundary({
  children,
  fallback,
}: SuspenseBoundaryProps) {
  const defaultFallback = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} showImage showAvatar lines={3} />
      ))}
    </div>
  );

  return (
    <Suspense fallback={fallback ?? defaultFallback}>{children}</Suspense>
  );
}
```

### Uso do SuspenseBoundary

```tsx
import { SuspenseBoundary } from "./components/ui/suspense/SuspenseBoundary";
import { MeuComponente } from "./components/MeuComponente";

export default function Page() {
  return (
    <SuspenseBoundary>
      <MeuComponente />
    </SuspenseBoundary>
  );
}
```

## 🔄 Múltiplos Suspense Boundaries

Você pode ter múltiplos boundaries para diferentes seções:

```tsx
export default function Page() {
  return (
    <div>
      <Suspense fallback={<SkeletonCard />}>
        <HeaderAssincrono />
      </Suspense>
      
      <Suspense fallback={<SkeletonText lines={5} />}>
        <ConteudoAssincrono />
      </Suspense>
      
      <Suspense fallback={<SkeletonCard showImage />}>
        <GaleriaAssincrona />
      </Suspense>
    </div>
  );
}
```

## 🎯 Padrões Avançados

### 1. Streaming de Dados

Com Server Components assíncronos, o Next.js faz streaming automático:

```tsx
async function ListaProdutos() {
  const produtos = await fetch('https://api.exemplo.com/produtos');
  return (
    <ul>
      {produtos.map(produto => (
        <li key={produto.id}>{produto.nome}</li>
      ))}
    </ul>
  );
}
```

### 2. Loading Progressivo

Diferentes seções podem carregar independentemente:

```tsx
export default function Dashboard() {
  return (
    <div>
      {/* Carrega primeiro */}
      <Suspense fallback={<SkeletonCard />}>
        <EstatisticasRapidas />
      </Suspense>
      
      {/* Carrega depois */}
      <Suspense fallback={<SkeletonText lines={10} />}>
        <RelatorioCompleto />
      </Suspense>
    </div>
  );
}
```

### 3. Error Boundaries Combinados

Combine Suspense com Error Boundaries:

```tsx
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary fallback={<Erro />}>
  <Suspense fallback={<SkeletonCard />}>
    <ComponenteAssincrono />
  </Suspense>
</ErrorBoundary>
```

## ⚡ Performance e Otimização

### Vantagens

1. **Streaming**: Conteúdo aparece assim que está pronto
2. **Não bloqueante**: Outras partes da página podem renderizar
3. **Menos JavaScript**: Server Components não enviam JS ao cliente
4. **SEO**: Conteúdo renderizado no servidor

### Boas Práticas

1. ✅ Use Suspense próximo ao componente assíncrono
2. ✅ Crie fallbacks específicos para cada contexto
3. ✅ Combine com skeletons que correspondem ao layout final
4. ✅ Evite Suspense muito genérico no layout raiz

## 🐛 Troubleshooting

### Suspense não está funcionando

- Verifique se o componente é realmente assíncrono (`async`)
- Certifique-se de que está usando Server Components (não Client Components)
- Confirme que está usando Next.js 15+ e React 20+

### Fallback não aparece

- Verifique se há um `await` no componente
- Certifique-se de que o Suspense está envolvendo o componente correto
- Verifique se não há um Suspense pai que está capturando primeiro

### Múltiplos Suspense não funcionam

- Cada Suspense boundary é independente
- Certifique-se de que cada componente assíncrono tem seu próprio Suspense
- Evite aninhar Suspense desnecessariamente

## 📖 Referências

- [React Suspense Documentation](https://react.dev/reference/react/Suspense)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

