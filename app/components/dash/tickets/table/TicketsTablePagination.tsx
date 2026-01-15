"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/app/lib/tailwind_utils";
import { type TicketsPagination } from "./types";

type TicketsTablePaginationProps = {
  pagination: TicketsPagination;
  onPageChange: (page: number) => void;
  className?: string;
};

type PaginationButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

function PaginationButton({
  onClick,
  disabled,
  children,
}: PaginationButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded-lg",
        "text-light/60 hover:text-light hover:bg-white/10",
        "transition-colors duration-150",
        "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      )}
    >
      {children}
    </button>
  );
}

export function TicketsTablePagination({
  pagination,
  onPageChange,
  className,
}: TicketsTablePaginationProps) {
  const { currentPage, totalPages } = pagination;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 py-4 px-6",
        "border-t border-white/10",
        className
      )}
    >
      <PaginationButton
        onClick={() => onPageChange(1)}
        disabled={isFirstPage}
      >
        <ChevronsLeft className="w-4 h-4" />
      </PaginationButton>

      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
      >
        <ChevronLeft className="w-4 h-4" />
      </PaginationButton>

      <span className="px-4 text-sm text-light/60">
        {currentPage} de {totalPages}
      </span>

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
      >
        <ChevronRight className="w-4 h-4" />
      </PaginationButton>

      <PaginationButton
        onClick={() => onPageChange(totalPages)}
        disabled={isLastPage}
      >
        <ChevronsRight className="w-4 h-4" />
      </PaginationButton>
    </div>
  );
}
