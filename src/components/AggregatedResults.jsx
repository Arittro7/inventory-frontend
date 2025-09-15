import { useState } from "react";
import API from "../api/axios";

export default function AggregatedResults() {
  const [results, setResults] = useState(null);

  const fetchResults = async () => {
    try {
      const res = await API.get("/aggregate");
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch aggregated results");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Aggregated Results</h2>
      <button
        onClick={fetchResults}
        className="px-4 py-2 bg-green-600 text-white rounded mb-4"
      >
        Load Results
      </button>

      {results ? (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(results, null, 2)}
        </pre>
      ) : (
        <p>No results loaded yet.</p>
      )}
    </div>
  );
}
