// src/components/Map.jsx
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import stations from "../assets/stations.json";
import "leaflet/dist/leaflet.css";

/* ---------------- helpers ---------------- */
function colour(v) {
  if (v === null) return "#94a3b8"; // grey
  if (v >= 150)   return "#dc2626"; // red
  if (v >= 100)   return "#ea580c"; // orange
  if (v >=  50)   return "#eab308"; // yellow
  return           "#22c55e";       // green
}

/* ---------- custom Leaflet control ---------- */
function Legend() {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const grades = [0, 50, 100, 150];
      div.innerHTML += "<h4>Fire Risk</h4>";
      for (let i = 0; i < grades.length; i++) {
        const from = grades[i];
        const to   = grades[i + 1];
        div.innerHTML +=
          `<i style="background:${colour(from + 1)};width:18px;height:18px;display:inline-block;
             margin-right:8px;border-radius:4px;"></i>
           ${to ? `${from}&ndash;${to - 1}` : `${from}+`}<br/>`;
      }
      return div;
    };

    legend.addTo(map);
    return () => legend.remove();
  }, [map]);

  return null;
}

/* ---------------- main map component ---------------- */
export default function Map({ value }) {
  return (
    <div className="h-[28rem] w-full rounded-md overflow-hidden">
      <MapContainer
        center={[47.5, -84.5]}      /* Ontario-ish */
        zoom={4.7}                  /* slight zoom-in */
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
              color      : colour(value),
              fillColor  : colour(value),
              fillOpacity: 0.8
            }}
          >
            <Tooltip direction="top" offset={[0, -4]} opacity={1}>
              <div className="text-sm">
                <p className="font-semibold">{s.FACILITY_NAME}</p>
                {value !== null && (
                  <>
                    Predicted fires next month:<br />
                    <span className="font-semibold">{value.toFixed(0)}</span>
                  </>
                )}
              </div>
            </Tooltip>
          </CircleMarker>
        ))}

        {/* 👇 legend control */}
        <Legend />
      </MapContainer>
    </div>
  );
}
