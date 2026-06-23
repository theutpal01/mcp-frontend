import axios, { AxiosInstance } from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8067";

/**
 * Server-Side Client Configuration
 * To be used explicitly inside Server Components, Server Actions or Route Handlers
 */
export const createServerApiClient = (token?: string): AxiosInstance => {
  return axios.create({
    baseURL: BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

/**
 * Client-Side Proxy Instance
 * Targets internal Next BFF endpoint route handlers to maintain absolute token obfuscation
 */
export const api = axios.create({
  baseURL: "/api/proxy",
  headers: {
    "Content-Type": "application/json",
  },
});

// Polyfills clean interception logic if client components require automatic dynamic state mapping
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Logic placeholder for global event bus redirection or trigger authentication states
    }
    return Promise.reject(error);
  }
);