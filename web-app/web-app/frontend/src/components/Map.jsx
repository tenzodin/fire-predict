// src/components/Map.jsx
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* -------------------------------------------------
   Dummy data: replace with your real model output.
   Each point needs: lat, lon, risk (0–1)
-------------------------------------------------- */
const dummyData = [
  { lat: 43.6532, lon: -79.3832, risk: 0.22 },
  { lat: 49.2827, lon: -123.1207, risk: 0.85 },
  { lat: 45.4215, lon: -75.6972, risk: 0.67 },
];

/* Color helper */
const getColor = (risk) => {
  if (risk >= 0.75) return "#ef4444";   // red
  if (risk >= 0.5)  return "#f59e0b";   // amber
  return "#22c55e";                     // green
};

export default function MapComponent() {
  return (
    <div className="h-[26rem] w-full rounded-md overflow-hidden">
      <MapContainer
        center={[45.4215, -75.6972]}  /* initial center */
        zoom={4}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {dummyData.map((pt, idx) => (
          <CircleMarker
            key={idx}
            center={[pt.lat, pt.lon]}
            radius={12}
            pathOptions={{ color: getColor(pt.risk), fillOpacity: 0.7 }}
          >
            <Tooltip direction="top" offset={[0, -4]} opacity={1}>
              <span className="font-semibold">
                {(pt.risk * 100).toFixed(1)}% risk
              </span>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
