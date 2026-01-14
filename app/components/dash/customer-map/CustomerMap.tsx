"use client";

import { useState, useMemo, useRef } from "react";
import { Card } from "@/app/components/ui/card/Card";
import { CardHeader } from "@/app/components/ui/card/CardHeader";
import { CardTitle } from "@/app/components/ui/card/CardTitle";
import { CardContent } from "@/app/components/ui/card/CardContent";
import { MapPin } from "lucide-react";
import type { MapLocation } from "@/app/usecases/map/map-usecase";
import { useOpenLayersMap } from "./hooks/useOpenLayersMap";
import { calculateMapCenter, calculateMapZoom } from "./utils/mapConfig";

type CustomerMapProps = {
  mapLocations?: MapLocation[];
};

const MAP_HEIGHT = "500px";

export function CustomerMap({ mapLocations = [] }: CustomerMapProps) {
  const [mapError, setMapError] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const mapCenter = useMemo(() => calculateMapCenter(), []);
  const mapZoom = useMemo(() => calculateMapZoom(mapLocations), [mapLocations]);

  const { isInitialized } = useOpenLayersMap({
    containerRef: mapContainerRef as React.RefObject<HTMLDivElement>,
    locations: mapLocations,
    center: mapCenter,
    zoom: mapZoom,
    onError: setMapError,
  });

  const hasLocations = mapLocations.length > 0;
  const isClient = typeof window !== "undefined";

  return (
    <Card className="transition-all duration-300 ease-out">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Mapa de clientes por região</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div
          className="relative w-full overflow-hidden rounded-lg"
          style={{ height: MAP_HEIGHT }}
        >
          {isClient ? (
            <>
              <div
                ref={mapContainerRef}
                className="w-full h-full map-dark-blue"
                style={{
                  height: MAP_HEIGHT,
                  width: "100%",
                  minHeight: MAP_HEIGHT,
                  position: "relative",
                  zIndex: 0,
                }}
              />
              {mapError && (
                <div className="absolute top-4 left-4 right-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3 z-[2000]">
                  <p className="text-red-300 text-sm">Erro: {mapError}</p>
                </div>
              )}
              {!hasLocations && !mapError && isInitialized && (
                <div className="absolute top-4 left-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 z-[2000]">
                  <p className="text-yellow-300 text-sm">
                    Nenhuma localização disponível
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="w-16 h-16 mx-auto text-teal-400/50 animate-pulse" />
                <p className="text-light/50 text-sm">Carregando mapa...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
