// src/components/Map.jsx
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import stations from "../assets/stations.json";      // <-- created above
import "leaflet/dist/leaflet.css";


function colour(v) {
  if (v === null)         return "#94a3b8";          // grey while we wait
  if (v >= 150)           return "#dc2626";          // red
  if (v >= 100)           return "#ea580c";          // orange
  if (v >=  50)           return "#eab308";          // yellow
  return                     "#22c55e";              // green
}

export default function Map({ value }) {
  return (
    <div className="h-[28rem] w-full rounded-md overflow-hidden">
      <MapContainer
        center={[49.0, -85]} zoom={4}
        scrollWheelZoom className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   attribution="&copy; OpenStreetMap" />

        {stations.map((s, i) => (
          <CircleMarker
            key={i}
            center={[s.Y, s.X]}
            radius={8}
            pathOptions={{ color: colour(value), fillOpacity: 0.8 }}
          >
            <Tooltip direction="top" offset={[0,-4]} opacity={1}>
              <div className="text-sm">
                <p className="font-semibold">{s.FACILITY_NAME}</p>
                {value !== null && (
                  <p>
                    Predicted fires next month:<br />
                    <span className="font-semibold">{value.toFixed(0)}</span>
                  </p>
                )}
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
