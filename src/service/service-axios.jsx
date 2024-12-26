import axios from "axios";
import { CONFIG } from "./config";

const THREE_MINUTES = 3 * 60 * 1000;

// Create an Axios instance with base URL and timeout
const ApiService = axios.create({
  baseURL: CONFIG.BASE_URL, // Your API base URL
  timeout: THREE_MINUTES,
});

// Request interceptor to add tokens to headers
ApiService.interceptors.request.use(async (config) => {
  if (config && config.headers) {
    config.headers["Content-Type"] = "application/json"; // Ensure content-type is set
  }
  return config;
});

export { ApiService };
