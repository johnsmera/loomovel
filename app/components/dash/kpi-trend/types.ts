export type KpiTrend = {
  labels: string[];
  arpuTrend: {
    name: string;
    data: number[];
  };
  conversionTrend: {
    name: string;
    data: number[];
  };
  churnTrend: {
    name: string;
    data: number[];
  };
  retentionTrend: {
    name: string;
    data: number[];
  };
};
