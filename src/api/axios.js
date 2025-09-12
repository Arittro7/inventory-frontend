import axios from "axios";

// Determine the base URL based on the environment
const baseURL = import.meta.env.PROD 
  ? "https://inventory-backend-x1n8.onrender.com"
  : import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
  baseURL: baseURL || "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
