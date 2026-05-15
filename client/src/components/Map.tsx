import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type LatLngExpression } from "leaflet";
import { type RenderType } from "../types/BusTypes";
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
const ChangeMapView = ({ center }: { center: LatLngExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 16);
  }, [center, map]);
  return null;
};

interface MapProps {
  renderType: RenderType;
  busStopNumber?: string;
}

const Map = ({ renderType, busStopNumber }: MapProps) => {
  const defaultSingaporePosition: LatLngExpression = [1.3521, 103.8198];

  const matchingStop = busStopsData.value.find(
    (stop) => stop.BusStopCode === busStopNumber
  );

  const markerPosition: LatLngExpression | null = matchingStop
    ? [Number(matchingStop.Latitude), Number(matchingStop.Longitude)]
    : null;

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
            <ChangeMapView center={markerPosition} />
            <Marker position={markerPosition}>
              <Popup>
                <strong>{matchingStop?.Description}</strong> <br />
                Bus Stop Code: {busStopNumber} <br />
                Road: {matchingStop?.RoadName}
              </Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;