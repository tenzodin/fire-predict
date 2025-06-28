import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import stations from "../assets/stations.json";
import "leaflet/dist/leaflet.css";

function colour(v) {
  if (v === null) return "#94a3b8";       // grey while waiting
  if (v >= 150)   return "#dc2626";       // red
  if (v >= 100)   return "#ea580c";       // orange
  if (v >= 50)    return "#eab308";       // yellow
  return           "#22c55e";             // green
}

export default function Map({ value }) {
  return (
    <div className="h-[28rem] w-full rounded-md overflow-hidden">
      <MapContainer
        center={[47.5, -84.5]} // Ontario-ish center
        zoom={4.8}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {stations.map((s, i) => (
          <CircleMarker
            key={i}
            center={[s.Y, s.X]}
            radius={value ? Math.min(15, value / 10 + 5) : 8}
            pathOptions={{
              color: colour(value),
              fillColor: colour(value),
              fillOpacity: 0.8,
              className: "station-marker", // can also use this if needed
            }}
          >
            <Tooltip direction="top" offset={[0, -4]} opacity={1}>
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
