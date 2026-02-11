import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api", // Default to local backend
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Mock Mode Toggle (Set to true to bypass backend)
export const USE_MOCK_DATA = true;

// Request Interceptor (e.g., for attaching tokens)
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (e.g., for global error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 (Unauthorized) or other errors globally
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
