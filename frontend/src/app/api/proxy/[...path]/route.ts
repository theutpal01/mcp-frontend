import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { BACKEND_URL, isProduction } from "@/lib/api/config";
import {
  buildTargetUrl,
  extractAccessToken,
  buildCookieHeader,
  parseSetCookie,
} from "@/lib/api/proxy/utils";

const handler = async (
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) => {
  const cookieStore = await cookies();
  const { path } = await params;
  const pathStr = path.join("/");
  const targetUrl = buildTargetUrl(BACKEND_URL, path, req.nextUrl.search);

  // Build outgoing headers
  const headers = new Headers();
  const accessToken = extractAccessToken(cookieStore);
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const allCookies = cookieStore.getAll();

  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  if (refreshToken) headers.set("cookie", buildCookieHeader(allCookies, "refresh_token"));

  const ct = req.headers.get("content-type");
  if (ct) headers.set("Content-Type", ct);

  const hasBody = req.method !== "GET" && req.method !== "HEAD" && req.body;
  const reqBody = hasBody ? await req.blob() : undefined;

  if (!isProduction) {
    console.log(`[PROXY] --> ${req.method} ${targetUrl}`);
    console.log(`[PROXY]     cookies: ${refreshToken ? "refresh_token present" : "none"}`);
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: reqBody,
      cache: "no-store",
    });
  } catch (err: any) {
    console.error(`[PROXY] fetch error: ${err.message}`);
    return NextResponse.json({ error: "Gateway error", details: err.message }, { status: 502 });
  }

  const isNoContent = backendRes.status === 204;
  const resBody = isNoContent ? null : await backendRes.blob();

  const clientResponse = new NextResponse(resBody, {
    status: backendRes.status,
    statusText: backendRes.statusText,
    headers: {
      "Content-Type": backendRes.headers.get("content-type") ?? "application/json",
    },
  });

  // Forward all Set-Cookie headers from backend, applying secure defaults
  const rawSetCookies = backendRes.headers.getSetCookie();
  for (const raw of rawSetCookies) {
    const parsed = parseSetCookie(raw);
    if (!parsed) continue;
    clientResponse.cookies.set(parsed.name, parsed.value, {
      path: parsed.path,
      httpOnly: parsed.httpOnly,
      secure: isProduction ? parsed.secure : false,
      sameSite: parsed.sameSite ?? "lax",
      maxAge: parsed.maxAge,
    });
  }

  // On login success — extract and store access token in a httpOnly cookie
  if (pathStr === "auth/login" && backendRes.status === 200 && resBody) {
    try {
      // Clone the stream so the body stays intact for the NextResponse
      const tokenObj = JSON.parse(await backendRes.clone().text());
      if (tokenObj.access_token) {
        clientResponse.cookies.set("plugfit_access", tokenObj.access_token, {
          httpOnly: true,
          secure: isProduction,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24, // 24 h
        });
      }
    } catch {/* token parsing failed — ignore */}
  }

  // On logout — scrub client-side auth cookies
  if (pathStr === "auth/logout") {
    clientResponse.cookies.delete("plugfit_access");
    clientResponse.cookies.delete("refresh_token");
    clientResponse.cookies.set("refresh_token", "", { path: "/", expires: new Date(0) });
    clientResponse.cookies.set("plugfit_access", "", { path: "/", expires: new Date(0) });
  }

  return clientResponse;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;