import type { MapLocation } from "@/app/usecases/map/map-usecase";

export type OpenLayersModules = {
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

export async function loadOpenLayersModules(): Promise<OpenLayersModules> {
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

export function createMarkerFeature(
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

export function createPopupElement(): HTMLDivElement {
  const popupElement = document.createElement("div");
  popupElement.className = "ol-popup";
  popupElement.style.display = "none";
  document.body.appendChild(popupElement);
  return popupElement;
}

export function createPopupContent(location: MapLocation): string {
  return `
    <div class="ol-popup-content">
      <h3 style="font-weight: 600; color: #1a1a1a; margin-bottom: 4px; font-size: 14px;">${location.name}</h3>
      <p style="color: #4b5563; font-size: 12px; margin-bottom: 4px;">${location.description}</p>
      <p style="color: #6b7280; font-size: 12px;">${location.address}</p>
    </div>
  `;
}

export function isFeature(obj: unknown): obj is { get: (key: string) => unknown } {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "get" in obj &&
    typeof (obj as { get?: unknown }).get === "function"
  );
}
