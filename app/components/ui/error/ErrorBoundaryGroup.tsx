"use client";

import { ReactNode } from "react";
import { ErrorBoundary, ErrorBoundaryProps } from "./ErrorBoundary";
import { SuspenseBoundary } from "../suspense/SuspenseBoundary";

export interface ErrorBoundaryGroupProps {
  children: ReactNode;
  errorBoundaryProps?: Omit<ErrorBoundaryProps, "children">;
  suspenseFallback?: ReactNode;
}

export function ErrorBoundaryGroup({
  children,
  errorBoundaryProps,
  suspenseFallback,
}: ErrorBoundaryGroupProps) {
  return (
    <ErrorBoundary {...errorBoundaryProps}>
      <SuspenseBoundary fallback={suspenseFallback}>
        {children}
      </SuspenseBoundary>
    </ErrorBoundary>
  );
}
