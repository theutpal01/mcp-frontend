import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    // 1. Extract the secure authentication stream cookie
    const token = request.cookies.get("plugfit_access")?.value;
    const { pathname } = request.nextUrl;

    // 2. Classify routing coordinates based on application architecture
    const isAuthRoute = 
        pathname.startsWith("/login") || 
        pathname.startsWith("/signup") || 
        pathname.startsWith("/verify-email") ||
		pathname.startsWith("/forget-password");

    // Targets protected core system assets
    const isProtectedRoute = 
        pathname.startsWith("/dashboard") || 
        pathname.startsWith("/servers") || 
        pathname.startsWith("/mcp");

    /**
     * CASE 1: Session Token Exists & User hits Auth Portals (/login, /signup, etc.)
     * Action: Bypass authorization screens completely and route directly to system core.
     */
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    /**
     * CASE 2: No Active Token Stream & User attempts to access Restricted Coordinates
     * Action: Intercept transaction, pass original location as a callback, and force login redirect.
     */
    if (!token && isProtectedRoute) {
        const loginUrl = new URL("/login", request.url);
        // Appends current page as a parameter so post-login returns here seamlessly
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Continue standard request handling pipeline if criteria matches
    return NextResponse.next();
}

/**
 * Performance Optimization:
 * Configures the firewall to only intercept page views—skipping static assets, 
 * images, next internal files (_next), and favicon configurations.
 */
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/servers/:path*", // Matches server control paths
        "/mcp/:path*",     // Matches model context protocol streams
        "/login",
        "/signup",
        "/verify-email"
    ],
};