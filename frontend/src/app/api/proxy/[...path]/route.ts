import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

async function handleProxy(
  req: NextRequest, 
  { params }: { params: Promise<{ path: string[] }> } 
) {
  // 1. Await the asynchronous interfaces
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("plugfit_access")?.value;
  
  const resolvedParams = await params;
  const pathString = resolvedParams.path.join("/");
  const searchParams = req.nextUrl.search;
  const targetUrl = `${BACKEND_URL}/${pathString}${searchParams}`;

  // 2. Initialize request headers
  const headers = new Headers();
  
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  /**
   * 🌟 FIX: Reconstruct the inbound cookie header directly from the Next.js Cookie Jar.
   * This guarantees that any cookie saved under path "/" (like our rewritten refresh_token)
   * is pulled reliably and formatted perfectly for the backend fetch call.
   */
  const allCookies = cookieStore.getAll();
  const cookieHeaderString = allCookies.map(c => `${c.name}=${c.value}`).join("; ");
  
  // 🔍 DEBUG LOGS: Watch your terminal to see exactly what is being sent to the backend
  console.log(`\n🚀 [PROXY REQUEST] ---> ${req.method} ${targetUrl}`);
  console.log("📦 [COOKIES SENT TO BACKEND]:", cookieHeaderString || "EMPTY");

  if (cookieHeaderString) {
    headers.set("cookie", cookieHeaderString);
  }

  const contentType = req.headers.get("content-type");
  if (contentType && !contentType.includes("multipart/form-data")) {
    headers.set("Content-Type", contentType);
  }

  try {
    const hasBody = req.method !== "GET" && req.method !== "HEAD" && req.body;
    const reqBody = hasBody ? await req.blob() : undefined;

    const backendResponse = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: reqBody,
      cache: "no-store",
    });

    const isNoContent = backendResponse.status === 204;
    const responseData = isNoContent ? null : await backendResponse.blob();
    
    const clientResponse = new NextResponse(responseData, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: {
        "Content-Type": backendResponse.headers.get("content-type") || "application/json",
      },
    });

    // Parse and register ALL backend cookies using Next.js's cookie manager
    const backendCookies = backendResponse.headers.getSetCookie();
    console.log("📥 [SET-COOKIE HEADERS FROM BACKEND]:", backendCookies);
    
    backendCookies.forEach((cookieString) => {
      const parts = cookieString.split(";").map(p => p.trim());
      const [cookieKeyValue] = parts;
      const equalsIndex = cookieKeyValue.indexOf("=");
      
      if (equalsIndex === -1) return;
      
      const cookieName = cookieKeyValue.substring(0, equalsIndex);
      const cookieValue = cookieKeyValue.substring(equalsIndex + 1);

      const options: any = {
        path: "/", 
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      };

      parts.slice(1).forEach(part => {
        const [key, val] = part.split("=");
        const lowerKey = key.toLowerCase();
        
        if (lowerKey === "httponly") options.httpOnly = true;
        if (lowerKey === "secure") options.secure = true; 
        if (lowerKey === "max-age") options.maxAge = parseInt(val, 10);
        if (lowerKey === "samesite") {
          const ssValue = val.toLowerCase();
          options.sameSite = ssValue === "none" || ssValue === "strict" || ssValue === "lax" ? ssValue : "lax";
        }
      });

      if (process.env.NODE_ENV !== "production") {
        options.secure = false; 
      }

      clientResponse.cookies.set(cookieName, cookieValue, options);
    });

    // Intercept auth/login to drop access token data securely straight into httpOnly scopes
    if (pathString === "auth/login" && backendResponse.status === 200 && responseData) {
      const textData = await responseData.text();
      const tokenObj = JSON.parse(textData);

      if (tokenObj.access_token) {
        clientResponse.cookies.set("plugfit_access", tokenObj.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24, // 24 Hours
        });
      }
    }

    // Intercept auth/logout to completely scrub client credentials immediately
    if (pathString === "auth/logout") {
      console.log("🧹 [LOGOUT INTERCEPTED] Flushing credentials from client response jar.");
      clientResponse.cookies.delete("plugfit_access");
      clientResponse.cookies.delete("refresh_token");
      
      // Explicitly force eviction via manual browser expiration strings
      clientResponse.cookies.set("refresh_token", "", {
        path: "/",
        expires: new Date(0),
      });
      clientResponse.cookies.set("plugfit_access", "", {
        path: "/",
        expires: new Date(0),
      });
    }

    return clientResponse;
  } catch (error: any) {
    console.error("🚨 [PROXY ERROR]:", error.message);
    return NextResponse.json(
      { error: "Gateway Connectivity Exception", details: error.message },
      { status: 502 }
    );
  }
}

export { handleProxy as GET, handleProxy as POST, handleProxy as PUT, handleProxy as DELETE };