import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type LatLngExpression } from "leaflet";
import { type NextBusType, type RenderType, type Service } from "../types/BusTypes";
import L from "leaflet";
import busStopsData from "../data/busStops.json";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to focus close up on the specific searched stop
const ChangeMapView = ({ center, searchCount, zoomLevel }: { center: LatLngExpression; searchCount: number, zoomLevel: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoomLevel);
  }, [center, map, searchCount, zoomLevel]);
  return null;
};

interface MapProps {
  renderType: RenderType;
  busStopNumber?: string;
  searchCount: number; // used to trigger re-centering when same bus stop number is searched
  selectedService: Service | null;
}

const Map = ({ renderType, busStopNumber, searchCount, selectedService }: MapProps) => {
  const defaultSingaporePosition: LatLngExpression = [1.3521, 103.8198];

  const matchingStop = busStopsData.value.find(
    (stop) => stop.BusStopCode === busStopNumber
  );

  const markerPosition: LatLngExpression | null = matchingStop
    ? [Number(matchingStop.Latitude), Number(matchingStop.Longitude)]
    : null;

  // Helper to safely parse live bus coordinates
  const getBusCoordinates = (busObj: NextBusType | undefined): LatLngExpression | null => {
    const lat = Number(busObj?.Latitude);
    const lng = Number(busObj?.Longitude);
    if (!lat || !lng || lat === 0 || lng === 0) return null;
    return [lat, lng];
  };

  const nextBusPos = getBusCoordinates(selectedService?.NextBus);
  const nextBus2Pos = getBusCoordinates(selectedService?.NextBus2);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={defaultSingaporePosition}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

        {renderType === "SINGLE_STOP" && markerPosition && (
          <>
            <ChangeMapView center={markerPosition} searchCount={searchCount} zoomLevel={16}/>
            <Marker position={markerPosition}>
              <Popup>
                <strong>{matchingStop?.Description}</strong> <br />
                Bus Stop Code: {busStopNumber} <br />
                Road: {matchingStop?.RoadName}
              </Popup>
            </Marker>
          </>
        )}

        {renderType === "ROUTE_VIEW" && selectedService && (
          <>
            {markerPosition && (
              <>
                <ChangeMapView center={markerPosition} searchCount={searchCount} zoomLevel={13}/>
                <Marker position={markerPosition}>
                  <Popup>
                    <strong>{matchingStop?.Description} ({busStopNumber})</strong> <br />
                    Waiting here for Bus {selectedService.ServiceNo}
                  </Popup>
                </Marker>
              </>
            )}

            {/* Marker for next bus */}
            {nextBusPos && (
              <Marker position={nextBusPos}>
                <Popup>
                  <strong>Bus {selectedService.ServiceNo} (Next)</strong> <br />
                  Load: {selectedService.NextBus.Load || "Unknown"} <br />
                  Type: {selectedService.NextBus.Type}
                </Popup>
              </Marker>
            )}

            {/* Marker for subsequent bus */}
            {nextBus2Pos && (
              <Marker position={nextBus2Pos}>
                <Popup>
                  <strong>Bus {selectedService.ServiceNo} (Subsequent)</strong> <br />
                  Load: {selectedService.NextBus2.Load || "Unknown"} <br />
                  Type: {selectedService.NextBus2.Type}
                </Popup>
              </Marker>
            )}
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;