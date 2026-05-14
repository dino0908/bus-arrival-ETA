import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type LatLngExpression } from "leaflet";

const Map = () => {
  const position: LatLngExpression = [1.3521, 103.8198]; // Singapore

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      </MapContainer>
    </div>
  );
};

export default Map;
