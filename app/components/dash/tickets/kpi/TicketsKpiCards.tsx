"use client";

import { MessageSquare, Clock, CheckCircle2, Timer } from "lucide-react";
import { TicketsKpiCard } from "./TicketsKpiCard";

type TicketsKpiData = {
  ticketsAbertos: number;
  emAndamento: number;
  resolvidosHoje: number;
  tempoMedio: string;
};

type TicketsKpiCardsProps = {
  data: TicketsKpiData;
};

export function TicketsKpiCards({ data }: TicketsKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <TicketsKpiCard
        title="Tickets Abertos"
        value={data.ticketsAbertos}
        icon={<MessageSquare className="w-6 h-6" />}
        iconColor="text-primary"
      />
      <TicketsKpiCard
        title="Em andamento"
        value={data.emAndamento}
        icon={<Clock className="w-6 h-6" />}
        iconColor="text-gold"
      />
      <TicketsKpiCard
        title="Resolvidos hoje"
        value={data.resolvidosHoje}
        icon={<CheckCircle2 className="w-6 h-6" />}
        iconColor="text-emerald-400"
      />
      <TicketsKpiCard
        title="Tempo Médio"
        value={data.tempoMedio}
        icon={<Timer className="w-6 h-6" />}
        iconColor="text-primary"
      />
    </div>
  );
}
