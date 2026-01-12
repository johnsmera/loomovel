"use client";

import { ErrorCard } from "./ErrorCard";
import { ErrorAction } from "./ErrorAction";
import { ErrorActions } from "./ErrorActions";

export interface ErrorDisplayProps {
  error: Error;
  onReset?: () => void;
  showDetails?: boolean;
}

export function ErrorDisplay({
  error,
  onReset,
  showDetails = false,
}: ErrorDisplayProps) {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <ErrorCard
        title="Ops! Algo deu errado"
        message={
          error.message ||
          "Ocorreu um erro inesperado. Por favor, tente novamente."
        }
        icon={
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        }
        action={
          <ErrorActions>
            {onReset && (
              <ErrorAction onClick={onReset} aria-label="Tentar novamente">
                Tentar Novamente
              </ErrorAction>
            )}
            <ErrorAction
              variant="secondary"
              onClick={() => window.location.reload()}
              aria-label="Recarregar página"
            >
              Recarregar Página
            </ErrorAction>
          </ErrorActions>
        }
      />

      {(showDetails || isDevelopment) && error.stack && (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300 mb-2">
            Detalhes técnicos (desenvolvimento)
          </summary>
          <pre className="mt-2 p-4 bg-gray-950/50 border border-gray-800/50 rounded-lg text-xs text-gray-400 overflow-auto max-h-64">
            <code>{error.stack}</code>
          </pre>
        </details>
      )}
    </div>
  );
}
