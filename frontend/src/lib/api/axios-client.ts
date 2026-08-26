import axios from "axios";

const apiInstance = axios.create({
  baseURL: "/api/proxy",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

/** 401 → silently refresh the session, then retry once */
apiInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response?.status;
    const config = error.config ?? {};
    const url: string = config.url ?? "";

    // Never retry the same request twice — prevents refresh/retry loops
    if (config._retry) return Promise.reject(error);

    // Don't refresh on auth endpoints (would infinite-loop); /auth/logout
    // is excluded because its proxy response scrubs cookies regardless of
    // upstream status — retrying or refreshing it is pointless.
    const isSafeRoute =
      !url.startsWith("/auth/login") &&
      !url.startsWith("/auth/register") &&
      !url.startsWith("/auth/refresh") &&
      !url.startsWith("/auth/logout");
    if (status === 401 && isSafeRoute) {
      try {
        const { AuthService } = await import("@/services/auth.service");
        await AuthService.refresh();
        config._retry = true;
        return apiInstance.request(config);
      } catch {
        // Refresh rejected — session is dead. Notify the app so guards can
        // bounce the user back to /login with a callbackUrl.
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("plugfit:session-expired"));
        }
      }
    }
    return Promise.reject(error);
  }
);

// Named exports for different import styles used across the codebase
export const clientApi = apiInstance;
/** @deprecated use clientApi instead */
export const api = apiInstance;