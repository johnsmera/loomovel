import { KpiResumeCard } from "./KpiResumeCard";

type KpiResume = {
  arpu: {
    valor: number;
    variacao: number;
  };
  conversion: {
    valor: number;
    variacao: number;
  };
  retention: {
    valor: number;
    variacao: number;
  };
  churn: {
    valor: number;
    variacao: number;
  };
};

type KpiResumeCardsProps = {
  data: KpiResume;
};

function formatArpu(value: number): string {
  return `R$ ${(value / 1000).toFixed(1)}k`;
}

function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function KpiResumeCards({ data }: KpiResumeCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiResumeCard
        title="ARPU"
        formattedValue={formatArpu(data.arpu.valor)}
        variation={data.arpu.variacao}
      />
      <KpiResumeCard
        title="Conversão"
        formattedValue={formatPercentage(data.conversion.valor)}
        variation={data.conversion.variacao}
      />
      <KpiResumeCard
        title="Retenção"
        formattedValue={formatPercentage(data.retention.valor)}
        variation={data.retention.variacao}
      />
      <KpiResumeCard
        title="Churn"
        formattedValue={formatPercentage(data.churn.valor)}
        variation={data.churn.variacao}
      />
    </div>
  );
}
