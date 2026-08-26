import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Shared helpers for normalizing backend/API errors (axios-shaped or native)
 * into safe user-facing strings. Keeps catch blocks free of `any`.
 */

interface ApiErrorLike {
  response?: {
    status?: number;
    data?: { detail?: unknown };
  };
  message?: string;
}

/** Extract the human-readable `detail` from a FastAPI/OpenAPI error payload. */
export function getApiErrorDetail(error: unknown): string | null {
  const detail = (error as ApiErrorLike)?.response?.data?.detail;

  if (typeof detail === "string") return detail;

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        const e = item as { loc?: (string | number)[]; msg?: string };
        const field = e.loc?.[e.loc.length - 1];
        return field ? `${String(field).toUpperCase()}: ${e.msg ?? ""}` : e.msg ?? "";
      })
      .filter(Boolean)
      .join(" | ");
  }

  return null;
}

/** True when the request never reached the server (offline / gateway down). */
export function isNetworkError(error: unknown): boolean {
  return !!(error as ApiErrorLike)?.message && !(error as ApiErrorLike)?.response;
}