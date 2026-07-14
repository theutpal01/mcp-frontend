export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8067";
export const isProduction = process.env.NODE_ENV === "production";