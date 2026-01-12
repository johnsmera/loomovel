"use client";

import { ReactNode, ErrorInfo } from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";
import { ErrorDisplay } from "./ErrorDisplay";

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, resetErrorBoundary: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: (details: {
    reason: "imperative-api" | "keys";
    args?: unknown[];
    prev?: unknown[];
    next?: unknown[];
  }) => void;
  resetKeys?: Array<string | number>;
}

export function ErrorBoundary({
  children,
  fallback,
  onError,
  onReset,
  resetKeys,
}: ErrorBoundaryProps) {
  const defaultFallbackRender = ({ error, resetErrorBoundary }: FallbackProps) => (
    <ErrorDisplay error={error} onReset={resetErrorBoundary} />
  );

  // Se fallback é uma função, usa fallbackRender
  if (typeof fallback === "function") {
    const fallbackRender = ({ error, resetErrorBoundary }: FallbackProps) =>
      fallback(error, resetErrorBoundary);

    return (
      <ReactErrorBoundary
        fallbackRender={fallbackRender}
        onError={onError}
        onReset={onReset}
        resetKeys={resetKeys}
      >
        {children}
      </ReactErrorBoundary>
    );
  }

  // Se fallback é ReactNode, usa fallback
  if (fallback) {
    return (
      <ReactErrorBoundary
        fallback={fallback}
        onError={onError}
        onReset={onReset}
        resetKeys={resetKeys}
      >
        {children}
      </ReactErrorBoundary>
    );
  }

  // Se não tem fallback, usa defaultFallbackRender
  return (
    <ReactErrorBoundary
      fallbackRender={defaultFallbackRender}
      onError={onError}
      onReset={onReset}
      resetKeys={resetKeys}
    >
      {children}
    </ReactErrorBoundary>
  );
}
