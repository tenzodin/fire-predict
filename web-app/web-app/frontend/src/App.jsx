import { useState, useEffect } from "react";

import GradientBackground   from "./components/GradientBackground";
import MapComponent         from "./components/Map";
import TypingAnimatedText   from "./components/TypingText";
import CallToAction         from "./components/CallToAction";
import logo                 from "../img/logo_small.png";
import LoadingOverlay from "./components/LoadingOverlay";

import "./index.css";
import "leaflet/dist/leaflet.css";

export default function App() {
  const [file,        setFile]       = useState(null);
  const [prediction,  setPrediction] = useState(null);   // ← single value
  const [pending,     setPending]    = useState(false);  // UX spinner
  const [loading, setLoading] = useState(true); // new state for initial page load

useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 1500); // 1.5 second delay
  return () => clearTimeout(timer);
}, []);


  /* ───────── upload & call FastAPI ───────── */
  async function handleUpload() {
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    setPending(true);

    try {
      const API = import.meta.env.VITE_API_URL;
      const res  = await fetch(`${API}/predict`, {
        method: "POST",
        body: fd,
      }); 

      const json = await res.json();
      setPrediction(json.predicted);
    } catch (err) {
      console.error("Upload failed ➜", err);
      alert("Upload failed – check console.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full font-sans text-white bg-gray-900 overflow-y-auto">
      <GradientBackground />

      {/* ───────── Header ───────── */}
      <header className="bg-gray-900/80 backdrop-blur-md shadow-md px-6 py-3 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="FireSight" className="h-12 w-auto" />
            <span className="text-2xl font-bold">FireSight</span>
          </div>

          <nav className="hidden md:flex space-x-6 text-gray-300">
            <a href="#home"   className="hover:text-white">Home</a>
            <a href="#about"  className="hover:text-white">About</a>
            <a href="#upload" className="hover:text-white">Upload</a>
            <a href="#contact"className="hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      {loading && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
    <LoadingOverlay />
  </div>
)}

      {/* ───────── Main ───────── */}
      <main className="relative z-10 mx-auto mt-8 max-w-4xl p-6">
        {/* animated headline */}
        <div className="mb-8 flex justify-center">
          <TypingAnimatedText
            words={["Predict", "Prepare", "Prevent"]}
            typingSpeed={140}
            deleteSpeed={80}
          />
        </div>

        {/* blurb */}
        <p className="text-center text-gray-300 mb-8">
          FireSight uses Ontario weather data to forecast next-month wildfire counts.
          Upload one row of monthly weather data (8 columns) to see the projection.
        </p>

        {/* upload card */}
        <section id="upload" className="rounded-lg bg-gray-800/70 backdrop-blur-md p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-center">Upload Weather CSV</h2>

          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4 w-full bg-gray-700 text-white file:mr-4 file:py-2 file:px-4
                       file:rounded file:border-0 file:text-sm file:font-semibold
                       file:bg-red-500 file:text-white hover:file:bg-red-600"
          />

          <button
            onClick={handleUpload}
            disabled={!file || pending}
            className={`w-full rounded px-4 py-2 font-medium transition
              ${file ? "bg-red-600 hover:bg-red-700" : "cursor-not-allowed bg-red-500/60"}
              ${pending && "opacity-60"}`}
          >
            {pending ? "Predicting…" : "Predict Fires"}
          </button>

          {prediction !== null && (
            <div className="mt-6 text-center">
              <p className="text-gray-300">Predicted wildfires next month:</p>
              <p className="text-5xl font-bold text-red-400">{prediction.toFixed(0)}</p>
            </div>
          )}
        </section>

        {/* map */}
        <div className="mt-10 rounded-md bg-gray-800/60 backdrop-blur">
          <MapComponent value={prediction} />
        </div>

        {/* CTA + footer */}
        <CallToAction />
        <footer className="text-gray-400 py-6 mt-12 border-t border-gray-700 text-center text-sm">
          © {new Date().getFullYear()} FireSight – All rights reserved.
        </footer>
      </main>
    </div>
  );
}
