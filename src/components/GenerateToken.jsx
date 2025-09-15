import { useState } from "react";
import API from "../api/axios";

export default function GenerateToken() {
  const [token, setToken] = useState(localStorage.getItem("apiToken") || "");

  const handleGenerate = async () => {
    try {
      const res = await API.post("/users/token");
      const newToken = res.data.apiToken;
      setToken(newToken);
      localStorage.setItem("apiToken", newToken);
      alert("API Token generated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to generate token");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">API Token</h2>
      {token ? (
        <div>
          <p className="mb-2">Your API Token:</p>
          <code className="bg-gray-100 px-3 py-1 rounded">{token}</code>
        </div>
      ) : (
        <p>No token found. Please generate one.</p>
      )}

      <button
        onClick={handleGenerate}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Generate Token
      </button>
    </div>
  );
}
