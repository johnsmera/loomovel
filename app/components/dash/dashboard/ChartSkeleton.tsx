import { Card } from "@/app/components/ui/card/Card";
import { CardHeader } from "@/app/components/ui/card/CardHeader";
import { CardContent } from "@/app/components/ui/card/CardContent";
import { Skeleton } from "@/app/components/ui/skeleton/Skeleton";
import { cn } from "@/app/lib/tailwind_utils";

type ChartSkeletonProps = {
  titleWidth?: string;
  showFilters?: boolean;
  chartType?: "area" | "bar";
};

export function ChartSkeleton({
  titleWidth = "200px",
  showFilters = false,
  chartType = "bar",
}: ChartSkeletonProps) {
  return (
    <Card className="transition-all duration-300 ease-out">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton height="1.5rem" width={titleWidth} className="rounded" />
          {showFilters && (
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  height="2rem"
                  width="80px"
                  className="rounded-full"
                />
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[350px]">
          {/* Eixos simulados */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
          <div className="absolute bottom-0 left-0 top-0 w-px bg-white/10" />

          {/* Labels do eixo X simulados */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4">
            {Array.from({ length: chartType === "bar" ? 6 : 12 }).map(
              (_, i) => (
                <Skeleton
                  key={i}
                  height="0.75rem"
                  width="24px"
                  className="rounded"
                />
              )
            )}
          </div>

          {/* Gráfico simulado */}
          {chartType === "bar" ? (
            // Barras para gráfico de barras
            <div className="absolute inset-0 flex items-end justify-between gap-1 px-4 pb-8">
              {Array.from({ length: 6 }).map((_, i) => {
                const height = `${20 + (i % 3) * 25}%`;
                return (
                  <Skeleton
                    key={i}
                    width="100%"
                    height={height}
                    className="rounded-t" 
                  />
                );
              })}
            </div>
          ) : (
            // Linha para gráfico de área
            <div className="absolute inset-0 pb-8">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgb(20, 184, 166)"
                      stopOpacity="0.7"
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(20, 184, 166)"
                      stopOpacity="0.1"
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,80 Q 20,60 40,50 T 80,40 T 100,30 L 100,100 L 0,100 Z"
                  fill="url(#gradient)"
                  className="animate-pulse"
                  opacity="0.3"
                />
                <path
                  d="M 0,80 Q 20,60 40,50 T 80,40 T 100,30"
                  stroke="rgb(20, 184, 166)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                  opacity="0.5"
                />
              </svg>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
