"use client";

import { cn } from "@/app/lib/tailwind_utils";
import { Select, type SelectOption } from "@/app/components/ui/select/Select";
import { type TicketsFilters } from "./types";

type TicketsTableFiltersProps = {
  filters: TicketsFilters;
  onFiltersChange: (filters: Partial<TicketsFilters>) => void;
  responsaveis: string[];
  className?: string;
};

export function TicketsTableFilters({
  filters,
  onFiltersChange,
  responsaveis,
  className,
}: TicketsTableFiltersProps) {
  const statusOptions: readonly SelectOption[] = [
    { value: "todos", label: "Todos os status" },
    { value: "aberto", label: "Aberto" },
    { value: "em_andamento", label: "Em andamento" },
    { value: "resolvido", label: "Resolvido" },
    { value: "fechado", label: "Fechado" },
  ];

  const prioridadeOptions: readonly SelectOption[] = [
    { value: "todas", label: "Todas as prioridades" },
    { value: "urgente", label: "Urgente" },
    { value: "media", label: "Média" },
    { value: "baixa", label: "Baixa" },
  ];

  const responsavelOptions: readonly SelectOption[] = [
    { value: "todos", label: "Todos os responsáveis" },
    ...responsaveis.map((r) => ({ value: r, label: r })),
  ];

  return (
    <div className={cn("flex items-center gap-3 h-full", className)}>
      <div className="flex-shrink-0 min-w-fit">
        <Select
          value={filters.status}
          onChange={(value) =>
            onFiltersChange({ status: value as TicketsFilters["status"] })
          }
          options={statusOptions}
          variant="compact"
          triggerClassName="rounded-full bg-dark-1000 border-none pl-3 pr-8 py-1.5 text-sm text-light focus:ring-1 focus:ring-primary/30 whitespace-nowrap"
        />
      </div>
      <div className="flex-shrink-0 min-w-fit">
        <Select
          value={filters.prioridade}
          onChange={(value) =>
            onFiltersChange({ prioridade: value as TicketsFilters["prioridade"] })
          }
          options={prioridadeOptions}
          variant="compact"
          triggerClassName="rounded-full bg-dark-1000 border-none pl-3 pr-8 py-1.5 text-sm text-light focus:ring-1 focus:ring-primary/30 whitespace-nowrap"
        />
      </div>
      <div className="flex-shrink-0 min-w-fit">
        <Select
          value={filters.responsavel}
          onChange={(value) => onFiltersChange({ responsavel: value })}
          options={responsavelOptions}
          variant="compact"
          triggerClassName="rounded-full bg-dark-1000 border-none pl-3 pr-8 py-1.5 text-sm text-light focus:ring-1 focus:ring-primary/30 whitespace-nowrap"
        />
      </div>
    </div>
  );
}
