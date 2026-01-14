import type { MapLocation } from "@/app/usecases/map/map-usecase";

const RECIFE_CENTER: [number, number] = [-34.877, -8.0476];
const DEFAULT_ZOOM = 12;
const ZOOM_FOR_MANY_LOCATIONS = 11;
const MANY_LOCATIONS_THRESHOLD = 50;

const BRAZIL_BOUNDS = {
  minLat: -35,
  maxLat: 5,
  minLng: -75,
  maxLng: -30,
};

function isLocationInBrazil(location: MapLocation): boolean {
  const [lng, lat] = location.coordinates;
  return (
    lat >= BRAZIL_BOUNDS.minLat &&
    lat <= BRAZIL_BOUNDS.maxLat &&
    lng >= BRAZIL_BOUNDS.minLng &&
    lng <= BRAZIL_BOUNDS.maxLng
  );
}

export function calculateMapCenter(): [number, number] {
  return RECIFE_CENTER;
}

export function calculateMapZoom(locations: MapLocation[]): number {
  if (locations.length === 0) {
    return DEFAULT_ZOOM;
  }

  const brazilLocations = locations.filter(isLocationInBrazil);

  if (brazilLocations.length === 0) {
    return DEFAULT_ZOOM;
  }

  if (brazilLocations.length > MANY_LOCATIONS_THRESHOLD) {
    return ZOOM_FOR_MANY_LOCATIONS;
  }

  return DEFAULT_ZOOM;
}
