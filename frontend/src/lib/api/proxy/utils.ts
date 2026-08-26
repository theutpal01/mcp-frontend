export interface ParsedSetCookie {
  name: string;
  value: string;
  path: string;
  httpOnly: boolean;
  secure: boolean;
  maxAge?: number;
  sameSite?: "lax" | "strict" | "none";
}

export function buildTargetUrl(
  baseUrl: string,
  path: string[],
  search: string
): string {
  return `${baseUrl}/${path.join("/")}${search}`;
}

export function extractAccessToken(
  cookieStore: { get: (name: string) => { value: string } | undefined }
): string | undefined {
  return cookieStore.get("plugfit_access")?.value;
}

export function buildCookieHeader(
  cookieStoreData: { name: string; value: string }[],
  cookieName: "refresh_token"
): string {
  return cookieStoreData
    .filter((c) => c.name === cookieName)
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

/**
 * Parse a raw Set-Cookie header string into structured fields.
 * Handles: name=value; Path=/; HttpOnly; Secure; Max-Age=3600; SameSite=Lax
 */
export function parseSetCookie(raw: string): ParsedSetCookie | null {
  const parts = raw.split(";").map((p) => p.trim());
  const [keyValue] = parts;

  const eqIndex = keyValue.indexOf("=");
  if (eqIndex === -1) return null;

  const name = keyValue.substring(0, eqIndex);
  const value = keyValue.substring(eqIndex + 1);
  const result: ParsedSetCookie = {
    name,
    value,
    path: "/",
    httpOnly: false,
    secure: false,
  };

  for (const part of parts.slice(1)) {
    const [key, ...valParts] = part.split("=");
    const k = key.toLowerCase();
    const val = valParts.join("=");

    if (k === "path") result.path = val;
    if (k === "httponly") result.httpOnly = true;
    if (k === "secure") result.secure = true;
    if (k === "max-age") result.maxAge = parseInt(val, 10);
    if (k === "samesite")
      result.sameSite =
        val === "none" || val === "strict" || val === "lax" ? val : "lax";
  }

  return result;
}

export function applySecureDefaults(
  parsed: ParsedSetCookie,
  isProd: boolean
): ParsedSetCookie {
  // Treat httpOnly=false cookies as non-secure in dev for easier local testing
  return isProd ? parsed : { ...parsed, secure: false };
}