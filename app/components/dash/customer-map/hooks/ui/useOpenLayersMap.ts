import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type Map from "ol/Map";
import type { MapLocation } from "@/app/usecases/map/map-usecase";
import {
  loadOpenLayersModules,
  createMarkerFeature,
  createPopupElement,
  createPopupContent,
  isFeature,
} from "@/app/lib/openlayers-helpers";

type UseOpenLayersMapOptions = {
  containerRef: RefObject<HTMLDivElement>;
  locations: MapLocation[];
  center: [number, number];
  zoom: number;
  onError?: (error: string) => void;
};

export function useOpenLayersMap({
  containerRef,
  locations,
  center,
  zoom,
  onError,
}: UseOpenLayersMapOptions) {
  const mapRef = useRef<Map | null>(null);
  const popupElementRef = useRef<HTMLDivElement | null>(null);
  const vectorSourceRef = useRef<import("ol/source/Vector").default | null>(
    null
  );
  const initializedRef = useRef(false);
  const onErrorRef = useRef(onError);
  const locationsRef = useRef<MapLocation[]>(locations);
  const centerRef = useRef<[number, number]>(center);
  const zoomRef = useRef<number>(zoom);
  const [isInitialized, setIsInitialized] = useState(false);

  // Atualizar refs sem causar re-renders
  useEffect(() => {
    onErrorRef.current = onError;
    locationsRef.current = locations;
    centerRef.current = center;
    zoomRef.current = zoom;
  }, [onError, locations, center, zoom]);

  // Inicialização do mapa - executa apenas uma vez quando o container está disponível
  useEffect(() => {
    if (initializedRef.current) return;
    if (!containerRef.current) return;

    let popupElement: HTMLDivElement | null = null;
    let popupOverlay: import("ol/Overlay").default | null = null;
    let isMounted = true;

    const initializeMap = async () => {
      try {
        if (!containerRef.current || initializedRef.current || !isMounted)
          return;

        const modules = await loadOpenLayersModules();

        if (!isMounted) return;

        popupElement = createPopupElement();
        popupElementRef.current = popupElement;

        popupOverlay = new modules.Overlay({
          element: popupElement,
          autoPan: {
            animation: { duration: 250 },
          },
        });

        const vectorSource = new modules.VectorSource();
        vectorSourceRef.current = vectorSource;

        // Adicionar marcadores iniciais se houver locations
        locationsRef.current.forEach((location) => {
          const feature = createMarkerFeature(location, modules);
          vectorSource.addFeature(feature);
        });

        const vectorLayer = new modules.VectorLayer({
          source: vectorSource,
        });

        const map = new modules.Map({
          target: containerRef.current,
          layers: [
            new modules.TileLayer({
              source: new modules.XYZ({
                url: "https://{a-d}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
                attributions:
                  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
              }),
              className: "map-tiles-dark-blue",
            }),
            vectorLayer,
          ],
          overlays: [popupOverlay],
          view: new modules.View({
            center: modules.fromLonLat(centerRef.current),
            zoom: zoomRef.current,
          }),
        });

        map.on("click", (event) => {
          if (!popupElement || !popupOverlay) return;

          const feature = map.forEachFeatureAtPixel(event.pixel, (feat) =>
            isFeature(feat) ? feat : null
          );

          if (feature && isFeature(feature)) {
            const location = feature.get("location") as MapLocation;
            popupElement.innerHTML = createPopupContent(location);
            popupOverlay.setPosition(event.coordinate);
            popupElement.style.display = "block";
          } else {
            popupElement.style.display = "none";
          }
        });

        map.on("pointermove", (event) => {
          const feature = map.forEachFeatureAtPixel(event.pixel, (feat) =>
            isFeature(feat) ? feat : null
          );
          map.getViewport().style.cursor = feature ? "pointer" : "";
        });

        if (!isMounted) {
          map.setTarget(undefined);
          return;
        }

        mapRef.current = map;
        initializedRef.current = true;
        setIsInitialized(true);

        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.updateSize();
          }
        }, 200);
      } catch (error) {
        if (!isMounted) return;
        const errorMessage =
          error instanceof Error ? error.message : "Erro desconhecido";
        onErrorRef.current?.(errorMessage);
        initializedRef.current = false;
        setIsInitialized(false);
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
        mapRef.current = null;
      }
      if (popupElement && popupElement.parentNode) {
        popupElement.parentNode.removeChild(popupElement);
      }
      initializedRef.current = false;
      setIsInitialized(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Atualização de marcadores e view - executa quando locations, center ou zoom mudam
  const prevLocationsRef = useRef<MapLocation[]>([]);
  const isFirstUpdateRef = useRef(true);

  useEffect(() => {
    if (!initializedRef.current || !vectorSourceRef.current || !mapRef.current)
      return;

    // Na primeira atualização após inicialização, sempre atualizar para garantir sincronização
    const isFirstUpdate = isFirstUpdateRef.current;
    if (isFirstUpdate) {
      isFirstUpdateRef.current = false;
    }

    // Verificar se realmente houve mudanças
    const locationsChanged =
      isFirstUpdate ||
      locations.length !== prevLocationsRef.current.length ||
      locations.some(
        (loc, idx) =>
          loc.id !== prevLocationsRef.current[idx]?.id ||
          loc.coordinates[0] !== prevLocationsRef.current[idx]?.coordinates[0] ||
          loc.coordinates[1] !== prevLocationsRef.current[idx]?.coordinates[1]
      );

    const centerChanged =
      isFirstUpdate ||
      center[0] !== centerRef.current[0] ||
      center[1] !== centerRef.current[1];
    const zoomChanged = isFirstUpdate || zoom !== zoomRef.current;

    if (!locationsChanged && !centerChanged && !zoomChanged) {
      return;
    }

    // Atualizar refs
    prevLocationsRef.current = locations;
    centerRef.current = center;
    zoomRef.current = zoom;

    const updateMarkers = async () => {
      try {
        const modules = await loadOpenLayersModules();
        const vectorSource = vectorSourceRef.current;
        if (!vectorSource || !mapRef.current) return;

        // Atualizar marcadores apenas se locations mudaram
        if (locationsChanged) {
          vectorSource.clear();
          locations.forEach((location) => {
            const feature = createMarkerFeature(location, modules);
            vectorSource.addFeature(feature);
          });
        }

        // Atualizar view (center e zoom) apenas se mudaram
        const view = mapRef.current.getView();
        if (view && (centerChanged || zoomChanged)) {
          if (centerChanged) {
            view.setCenter(modules.fromLonLat(center));
          }
          if (zoomChanged) {
            view.setZoom(zoom);
          }
        }
        mapRef.current.updateSize();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Erro desconhecido";
        onErrorRef.current?.(errorMessage);
      }
    };

    updateMarkers();
  }, [locations, center, zoom]);

  return { isInitialized };
}
