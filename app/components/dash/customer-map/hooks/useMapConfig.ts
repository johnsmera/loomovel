import { useMemo } from "react";
import type { MapLocation } from "@/app/usecases/map/map-usecase";
import { calculateMapCenter, calculateMapZoom } from "../utils/mapConfig";

export function useMapConfig(locations: MapLocation[]) {
  const center = useMemo(() => calculateMapCenter(), []);
  const zoom = useMemo(() => calculateMapZoom(locations), [locations]);

  return {
    center,
    zoom,
  };
}
