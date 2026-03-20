import axios from "axios";

// Base URL for all API requests
const BASE_URL = "https://zubitechnologies.com/obd_final_apis/api";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Mock Mode Toggle (Set to true to bypass backend)
export const USE_MOCK_DATA = false;

// Request Interceptor — attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("vescan_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor — global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
