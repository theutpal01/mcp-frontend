/**
 * Types used exclusively within the API proxy route handler.
 * Application-level types (UserOut, ServerOut, etc.) live in @/types/api.
 */

export interface ProxyHandlerContext {
  cookieStore: {
    get: (name: string) => { value: string } | undefined;
    getAll: () => { name: string; value: string }[];
  };
}

export interface ProxyRequestConfig {
  targetUrl: string;
  method: string;
  headers: Headers;
  body?: Blob;
}

export interface ProxyResponseConfig {
  status: number;
  statusText: string;
  contentType: string | null;
  body: Blob | null;
  setCookieHeaders: string[];
}