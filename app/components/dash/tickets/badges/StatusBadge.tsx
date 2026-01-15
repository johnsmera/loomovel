"use client";

import { cn } from "@/app/lib/tailwind_utils";

export type TicketStatus = "aberto" | "em_andamento" | "resolvido" | "fechado";

type StatusBadgeProps = {
  status: TicketStatus;
  className?: string;
};

const statusConfig: Record<
  TicketStatus,
  { label: string; bgColor: string; textColor: string }
> = {
  aberto: {
    label: "Aberto",
    bgColor: "bg-primary/20",
    textColor: "text-primary",
  },
  em_andamento: {
    label: "Em andamento",
    bgColor: "bg-gold/20",
    textColor: "text-gold",
  },
  resolvido: {
    label: "Resolvido",
    bgColor: "bg-emerald-500/20",
    textColor: "text-emerald-400",
  },
  fechado: {
    label: "Fechado",
    bgColor: "bg-white/10",
    textColor: "text-light/60",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        "transition-colors duration-200",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      {config.label}
    </span>
  );
}
