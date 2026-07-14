import axios from "axios";

const apiInstance = axios.create({
  baseURL: "/api/proxy",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

/** 401 → silently refresh the session, then retry */
apiInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "";

    // Don't refresh on auth endpoints (would infinite-loop)
    const isSafeRoute = !url.startsWith("/auth/login") && !url.startsWith("/auth/register");
    if (status === 401 && isSafeRoute) {
      try {
        const { AuthService } = await import("@/services/auth.service");
        await AuthService.refresh();
        return apiInstance.request(error.config);
      } catch {
        // Refresh rejected — let 401 propagate
      }
    }
    return Promise.reject(error);
  }
);

// Named exports for different import styles used across the codebase
export const clientApi = apiInstance;
/** @deprecated use clientApi instead */
export const api = apiInstance;