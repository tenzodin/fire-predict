import { useState } from "react";
import GradientBackground from "./components/GradientBackground";
import logo from "../img/logo_small.png";          // ← import the logo
import "./index.css";
import "leaflet/dist/leaflet.css";
import MapComponent from "./components/Map";
import TypingAnimatedText from "./components/TypingText";
import CallToAction from "./components/CallToAction";


function App() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      setResults(await res.json());
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="relative min-h-screen w-full font-sans text-white bg-gray-900 overflow-y-auto">
      {/* gradient background */}
      <GradientBackground />

      {/* main content */}
      <div className="relative z-10">
        {/* ---------- header ---------- */}
       <header className="bg-gray-900/80 backdrop-blur-md shadow-md px-6 py-3">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    {/* Logo */}
    <div className="flex items-center space-x-3">
      <img
        src={logo}
        alt="FireSight logo"
        className="h-12 w-auto"
      />
      <span className="text-white text-2xl font-bold">FireSight</span>
    </div>

    {/* Navigation */}
    <nav className="space-x-6 hidden md:flex">
      <a href="#home" className="text-gray-300 hover:text-white transition">Home</a>
      <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
      <a href="#upload" className="text-gray-300 hover:text-white transition">Upload</a>
      <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
    </nav>
  </div>
</header>



        {/* ---------- main ---------- */}
        <main className="mx-auto mt-8 max-w-4xl p-6">
            <div className="mt-4 mb-8 flex justify-center">
  <TypingAnimatedText />
</div>
          {/* upload card */}
          <div className="rounded-lg bg-gray-800/70 backdrop-blur-md p-6 shadow-md">
          <p className="text-center text-gray-300">
            Upload a CSV file with environmental data and view risk zones.
          </p>
            <h2 className="mb-2 text-xl font-semibold">Upload CSV</h2>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mb-4 w-full bg-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
            />
            <button
              onClick={handleUpload}
              disabled={!file}
              className={`mt-2 rounded px-4 py-2 font-medium ${
                file
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "cursor-not-allowed bg-red-500 text-gray-200"
              }`}
            >
              Predict Fire Risk
            </button>
          </div>

          {/* map placeholder */}
          <div className="mt-10 flex h-100 items-center justify-center rounded-md bg-gray-800/60 backdrop-blur">
             <MapComponent />
          </div>

          {/* results table */}
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-semibold">Prediction Results</h2>
            {results.length === 0 ? (
              <p className="text-gray-400">No results yet. Upload a file above.</p>
            ) : (
              <table className="w-full overflow-hidden rounded shadow text-sm">
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="p-2 text-left">Lat</th>
                    <th className="p-2 text-left">Lon</th>
                    <th className="p-2 text-left">Risk %</th>
                    <th className="p-2 text-left">Explanation</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/70 text-white">
                  {results.map((row, i) => (
                    <tr key={i} className="border-b border-gray-700 hover:bg-gray-700/40">
                      <td className="p-2">{row.lat}</td>
                      <td className="p-2">{row.lon}</td>
                      <td className="p-2">
                        {(row.risk_probability * 100).toFixed(1)}%
                      </td>
                      <td className="p-2">{row.explanation || "–"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
           <CallToAction />
        </main>
        <footer className="bg-gray-900 text-gray-400 py-6 mt-12 border-t border-gray-700">
  <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
    <p className="text-sm text-center md:text-left">
      &copy; {new Date().getFullYear()} FireSight. All rights reserved.
    </p>

    <div className="mt-4 md:mt-0 flex space-x-4">
      <a href="#privacy" className="hover:text-white transition">Privacy</a>
      <a href="#terms" className="hover:text-white transition">Terms</a>
      <a href="#contact" className="hover:text-white transition">Contact</a>
    </div>
  </div>
</footer>

      </div>
    </div>
  );
}

export default App;
