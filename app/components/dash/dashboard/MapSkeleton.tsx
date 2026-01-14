import { Card } from "@/app/components/ui/card/Card";
import { CardHeader } from "@/app/components/ui/card/CardHeader";
import { CardContent } from "@/app/components/ui/card/CardContent";
import { Skeleton } from "@/app/components/ui/skeleton/Skeleton";

export function MapSkeleton() {
  return (
    <Card className="transition-all duration-300 ease-out">
      <CardHeader>
        <div className="flex flex-col gap-4">
          <Skeleton height="1.5rem" width="250px" />
          <div className="flex flex-wrap gap-3">
            <Skeleton height="2.5rem" width="150px" className="rounded-lg" />
            <Skeleton height="2.5rem" width="150px" className="rounded-lg" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden bg-dark-1000/50 border border-white/10">
          {/* Simulação de mapa com grid pattern */}
          <div className="absolute inset-0">
            <div className="grid grid-cols-8 grid-rows-8 h-full w-full opacity-10">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-white/5"
                  style={{
                    animationDelay: `${(i % 8) * 50}ms`,
                  }}
                />
              ))}
            </div>
            {/* Marcadores simulados */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  animationDelay: `${i * 200}ms`,
                }}
              >
                <Skeleton
                  width="20px"
                  height="20px"
                  className="rounded-full border-2 border-white"
                />
              </div>
            ))}
          </div>
          {/* Legenda simulada */}
          <div className="absolute bottom-4 left-4 right-4 z-[1000]">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton width="12px" height="12px" className="rounded-full" />
                    <Skeleton height="0.75rem" width="80px" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
