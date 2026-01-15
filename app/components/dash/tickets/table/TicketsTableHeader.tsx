"use client";

import { cn } from "@/app/lib/tailwind_utils";

type Column = {
  key: string;
  label: string;
  width?: string;
};

type TicketsTableHeaderProps = {
  columns: Column[];
  className?: string;
};

export function TicketsTableHeader({
  columns,
  className,
}: TicketsTableHeaderProps) {
  return (
    <div
      className={cn(
        "grid gap-4 px-6 py-3 border-b border-white/10",
        "text-xs font-medium text-light/50 uppercase tracking-wide",
        className
      )}
      style={{
        gridTemplateColumns: columns.map((col) => col.width || "1fr").join(" "),
      }}
    >
      {columns.map((column) => (
        <div key={column.key}>{column.label}</div>
      ))}
    </div>
  );
}
