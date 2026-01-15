"use client";

import { ExternalLink } from "lucide-react";
import { cn } from "@/app/lib/tailwind_utils";
import { StatusBadge } from "../badges/StatusBadge";
import { PriorityBadge } from "../badges/PriorityBadge";
import { type Ticket } from "./types";

type TicketsTableRowProps = {
  ticket: Ticket;
  onEdit?: (ticket: Ticket) => void;
  onView?: (ticket: Ticket) => void;
  className?: string;
};

export function TicketsTableRow({
  ticket,
  onEdit,
  onView,
  className,
}: TicketsTableRowProps) {
  return (
    <div
      className={cn(
        "grid gap-4 px-6 py-4 items-center",
        "border-b border-white/5",
        "hover:bg-white/5 transition-colors duration-150",
        className
      )}
      style={{
        gridTemplateColumns:
          "80px 100px 1fr 1.2fr 120px 100px 140px 120px",
      }}
    >
      {/* ID */}
      <div className="text-primary font-medium text-sm">{ticket.ticketId}</div>

      {/* Prioridade */}
      <div>
        <PriorityBadge priority={ticket.prioridade} />
      </div>

      {/* Cliente */}
      <div className="flex flex-col min-w-0">
        <span className="text-light font-medium text-sm truncate">
          {ticket.cliente.nome}
        </span>
        <span className="text-light/50 text-xs truncate">
          {ticket.cliente.email}
        </span>
      </div>

      {/* Assunto */}
      <div className="text-light/80 text-sm truncate">{ticket.assunto}</div>

      {/* Status */}
      <div>
        <StatusBadge status={ticket.status} />
      </div>

      {/* Criado em */}
      <div className="text-light/60 text-sm">{ticket.criadoEm}</div>

      {/* Responsável */}
      <div className="text-primary text-sm">{ticket.responsavel}</div>

      {/* Ações */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onEdit?.(ticket)}
          className={cn(
            "flex items-center gap-1.5 text-xs text-light/60",
            "hover:text-light transition-colors duration-150"
          )}
        >
          Editar
          <ExternalLink className="w-3 h-3" />
        </button>
        <button
          onClick={() => onView?.(ticket)}
          className={cn(
            "flex items-center gap-1.5 text-xs text-light/60",
            "hover:text-light transition-colors duration-150"
          )}
        >
          Ver
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
