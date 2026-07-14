import axios, { AxiosInstance } from "axios";
import { BACKEND_URL } from "./config";

/**
 * Server-side API client for use in Server Components, Server Actions,
 * or Route Handlers that call the backend directly (bypassing the proxy).
 * Currently unused but kept for future server-to-server calls.
 */
export const createServerApiClient = (token?: string): AxiosInstance =>
  axios.create({
    baseURL: BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });