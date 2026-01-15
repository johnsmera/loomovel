import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type Map from "ol/Map";
import type { MapLocation } from "@/app/usecases/map/map-usecase";

type UseOpenLayersMapOptions = {
  containerRef: RefObject<HTMLDivElement>;
  locations: MapLocation[];
  center: [number, number];
  zoom: number;
  onError?: (error: string) => void;
};

type OpenLayersModules = {
  Map: typeof import("ol").Map;
  View: typeof import("ol").View;
  TileLayer: typeof import("ol/layer/Tile").default;
  VectorLayer: typeof import("ol/layer/Vector").default;
  VectorSource: typeof import("ol/source/Vector").default;
  XYZ: typeof import("ol/source/XYZ").default;
  Feature: typeof import("ol/Feature").default;
  Point: typeof import("ol/geom/Point").default;
  Overlay: typeof import("ol/Overlay").default;
  fromLonLat: typeof import("ol/proj").fromLonLat;
  Style: typeof import("ol/style").Style;
  Circle: typeof import("ol/style").Circle;
  Fill: typeof import("ol/style").Fill;
  Stroke: typeof import("ol/style").Stroke;
};

async function loadOpenLayersModules(): Promise<OpenLayersModules> {
  const [
    ol,
    TileLayerModule,
    VectorLayerModule,
    VectorSourceModule,
    XYZModule,
    FeatureModule,
    PointModule,
    projModule,
    styleModule,
    OverlayModule,
  ] = await Promise.all([
    import("ol"),
    import("ol/layer/Tile"),
    import("ol/layer/Vector"),
    import("ol/source/Vector"),
    import("ol/source/XYZ"),
    import("ol/Feature"),
    import("ol/geom/Point"),
    import("ol/proj"),
    import("ol/style"),
    import("ol/Overlay"),
  ]);

  return {
    Map: ol.Map,
    View: ol.View,
    TileLayer: TileLayerModule.default,
    VectorLayer: VectorLayerModule.default,
    VectorSource: VectorSourceModule.default,
    XYZ: XYZModule.default,
    Feature: FeatureModule.default,
    Point: PointModule.default,
    Overlay: OverlayModule.default,
    fromLonLat: projModule.fromLonLat,
    Style: styleModule.Style,
    Circle: styleModule.Circle,
    Fill: styleModule.Fill,
    Stroke: styleModule.Stroke,
  };
}

function createMarkerFeature(
  location: MapLocation,
  modules: OpenLayersModules
) {
  const [lng, lat] = location.coordinates;
  const coordinate = modules.fromLonLat([lng, lat]);

  const feature = new modules.Feature({
    geometry: new modules.Point(coordinate),
    location,
  });

  const style = new modules.Style({
    image: new modules.Circle({
      radius: 10,
      fill: new modules.Fill({ color: location.color }),
      stroke: new modules.Stroke({
        color: "#ffffff",
        width: 2,
      }),
    }),
  });

  feature.setStyle(style);
  return feature;
}

function createPopupElement(): HTMLDivElement {
  const popupElement = document.createElement("div");
  popupElement.className = "ol-popup";
  popupElement.style.display = "none";
  document.body.appendChild(popupElement);
  return popupElement;
}

function createPopupContent(location: MapLocation): string {
  return `
    <div class="ol-popup-content">
      <h3 style="font-weight: 600; color: #1a1a1a; margin-bottom: 4px; font-size: 14px;">${location.name}</h3>
      <p style="color: #4b5563; font-size: 12px; margin-bottom: 4px;">${location.description}</p>
      <p style="color: #6b7280; font-size: 12px;">${location.address}</p>
    </div>
  `;
}

function isFeature(obj: unknown): obj is { get: (key: string) => unknown } {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "get" in obj &&
    typeof (obj as { get?: unknown }).get === "function"
  );
}

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
