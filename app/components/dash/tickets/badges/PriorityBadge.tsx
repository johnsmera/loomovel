"use client";

import { cn } from "@/app/lib/tailwind_utils";

export type TicketPriority = "urgente" | "media" | "baixa";

type PriorityBadgeProps = {
  priority: TicketPriority;
  className?: string;
};

const priorityConfig: Record<
  TicketPriority,
  { label: string; bgColor: string; textColor: string }
> = {
  urgente: {
    label: "Urgente",
    bgColor: "bg-red-500/80",
    textColor: "text-white",
  },
  media: {
    label: "Média",
    bgColor: "bg-gold/80",
    textColor: "text-dark-1000",
  },
  baixa: {
    label: "Baixa",
    bgColor: "bg-emerald-500/80",
    textColor: "text-white",
  },
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];

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
