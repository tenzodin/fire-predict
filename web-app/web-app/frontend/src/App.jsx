import { useState } from "react";
import "./index.css";

function App() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <header className="bg-white shadow p-6">
        <h1 className="text-3xl font-bold text-center text-red-600">
          🔥 Forest Fire Predictor
        </h1>
        <p className="text-center mt-2 text-gray-600">
          Upload a CSV file with environmental data and view risk zones.
        </p>
      </header>

      <main className="p-6 max-w-4xl mx-auto">
        {/* Upload section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Upload CSV</h2>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mb-4"
          />
          <button
            onClick={handleUpload}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Predict Fire Risk
          </button>
        </div>

        {/* Map Placeholder */}
        <div className="mt-10 bg-gray-200 h-80 rounded-md flex items-center justify-center">
          <span className="text-gray-600">🗺️ Map visualization will go here</span>
        </div>

        {/* Results section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Prediction Results</h2>
          {results.length === 0 ? (
            <p className="text-gray-500">No results yet. Upload a file above.</p>
          ) : (
            <table className="w-full border rounded overflow-hidden shadow text-sm">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="p-2 text-left">Lat</th>
                  <th className="p-2 text-left">Lon</th>
                  <th className="p-2 text-left">Risk %</th>
                  <th className="p-2 text-left">Explanation</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {results.map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{row.lat}</td>
                    <td className="p-2">{row.lon}</td>
                    <td className="p-2">{(row.risk_probability * 100).toFixed(1)}%</td>
                    <td className="p-2">{row.explanation || "–"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
