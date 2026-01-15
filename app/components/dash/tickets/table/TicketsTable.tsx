"use client";

import { type ReactNode } from "react";
import { cn } from "@/app/lib/tailwind_utils";
import { TicketsTableSearch } from "./TicketsTableSearch";
import { TicketsTableFilters } from "./TicketsTableFilters";
import { TicketsTableHeader } from "./TicketsTableHeader";
import { TicketsTableRow } from "./TicketsTableRow";
import { TicketsTablePagination } from "./TicketsTablePagination";

type TicketsTableProps = {
  children: ReactNode;
  className?: string;
};

function TicketsTableComponent({ children, className }: TicketsTableProps) {
  return (
    <div
      className={cn(
        "rounded-xl",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}

type TicketsTableToolbarProps = {
  children: ReactNode;
  className?: string;
};

function TicketsTableToolbar({ children, className }: TicketsTableToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4",
        "p-6 border-b border-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}

type TicketsTableTitleProps = {
  children: ReactNode;
  className?: string;
};

function TicketsTableTitle({ children, className }: TicketsTableTitleProps) {
  return (
    <h2 className={cn("text-lg font-semibold text-light", className)}>
      {children}
    </h2>
  );
}

type TicketsTableBodyProps = {
  children: ReactNode;
  className?: string;
};

function TicketsTableBody({ children, className }: TicketsTableBodyProps) {
  return <div className={cn("overflow-x-auto", className)}>{children}</div>;
}

type TicketsTableEmptyProps = {
  message?: string;
  className?: string;
};

function TicketsTableEmpty({
  message = "Nenhum ticket encontrado",
  className,
}: TicketsTableEmptyProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center py-16",
        "text-light/50 text-sm",
        className
      )}
    >
      {message}
    </div>
  );
}

export const TicketsTable = Object.assign(TicketsTableComponent, {
  Toolbar: TicketsTableToolbar,
  Title: TicketsTableTitle,
  Search: TicketsTableSearch,
  Filters: TicketsTableFilters,
  Header: TicketsTableHeader,
  Body: TicketsTableBody,
  Row: TicketsTableRow,
  Pagination: TicketsTablePagination,
  Empty: TicketsTableEmpty,
});
