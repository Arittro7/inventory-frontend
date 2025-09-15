import axios from "axios";

const baseURL = import.meta.env.PROD 
  ? "https://inventory-backend-x1n8.onrender.com/api" 
  : import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL,
});

// Interceptors -> attach JWT + apiToken
API.interceptors.request.use((config) => {
  // ✅ JWT token for auth
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ✅ apiToken for Odoo integration
  const apiToken = localStorage.getItem("apiToken");
  if (apiToken) {
    config.headers["x-api-token"] = apiToken;
  }

  return config;
});

export default API;
