"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthService } from "@/services/auth.service";
import { useRouter, usePathname } from "next/navigation";
import { UserOut } from "@/types/api";

interface AuthContextType {
    user: UserOut | null;
    isLoading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const PUBLIC_ROUTES = ["/login", "/signup", "/verify-email", "/forgot-password"];

/** Fired by the axios interceptor when a session token refresh fails. */
export const SESSION_EXPIRED_EVENT = "plugfit:session-expired";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [user, setUser] = useState<UserOut | null>(null);

    /**
     * Path for which the most recent GET /auth/me hydration attempt has
     * completed. `null` when we start on a protected route (hydration still
     * pending) or haven't hydrated yet. Tracking the *path* (not just a
     * boolean) keeps guards correct across client-side navigation — e.g.
     * login → dashboard must show as "loading" until /auth/me resolves,
     * otherwise guards would bounce the fresh session back to /login.
     */
    const [hydratedPath, setHydratedPath] = useState<string | null>(
        () => (PUBLIC_ROUTES.includes(pathname) ? pathname : null)
    );

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    // Loading while the current protected path has no completed hydration yet
    const isLoading = !isPublicRoute && hydratedPath !== pathname;

    // Hydrate user info once per navigation segment. Skipped entirely on
    // unauthenticated public portals — a logged-in user landing there is
    // redirected by proxy.ts anyway.
    useEffect(() => {
        if (isPublicRoute) return;
        let cancelled = false;

        AuthService.getMe()
            .then((userData) => {
                if (!cancelled) setUser(userData);
            })
            .catch(() => {
                if (!cancelled) setUser(null);
            })
            .finally(() => {
                if (!cancelled) setHydratedPath(pathname);
            });

        return () => {
            cancelled = true;
        };
    }, [pathname, isPublicRoute]);

    // Global session-expiry recovery: the axios interceptor dispatches this
    // event when a silent token refresh fails. We drop the stale user so
    // guards redirect back to login, AND fire-and-forget a logout request so
    // the server-side route handler scrubs the now-invalid httpOnly cookies —
    // otherwise proxy.ts keeps treating the dead session as logged-in.
    useEffect(() => {
        function handleSessionExpired() {
            if (PUBLIC_ROUTES.includes(pathname)) return;
            setUser(null);
            setHydratedPath(pathname);
            AuthService.logout().catch(() => {
                // Backend may be gone — cookie scrubbing happens in the proxy
                // route handler regardless of the upstream call's outcome.
            });
        }
        window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
        return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    }, [pathname]);

    const refreshUser = useCallback(async () => {
        try {
            const userData = await AuthService.getMe();
            setUser(userData);
        } catch {
            setUser(null);
        } finally {
            setHydratedPath(pathname);
        }
    }, [pathname]);

    const logout = useCallback(async () => {
        try {
            await AuthService.logout(); // Server route handler scrubs auth cookies
        } catch (err) {
            console.error("Logout execution error:", err);
        } finally {
            // plugfit_access is httpOnly — it cannot be cleared from JS.
            // Cookie scrubbing is handled server-side by the proxy route handler.
            setUser(null);
            setHydratedPath(pathname);
            // HARD navigation: guarantees all client state and the router cache
            // are discarded, and proxy.ts sees a cookie-free request.
            // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- hard nav is intentional, see comment above
            window.location.assign("/login");
        }
    }, [pathname]);

    return (
        <AuthContext.Provider value={{ user, isLoading, refreshUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook to safely consume user context anywhere across platform layouts
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be wrapped tightly within an AuthProvider element structure.");
    }
    return context;
}

/**
 * Client-side guard for protected pages. Complements proxy.ts (which only
 * checks cookie presence): waits for hydration, then bounces dead sessions
 * to /login preserving the intended destination.
 *
 * `reauth=1` tells proxy.ts to skip its "logged-in users skip auth portals"
 * redirect — otherwise a stale cookie would bounce us straight back here.
 */
export function useRequireAuth() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !user) {
            const params = new URLSearchParams({
                callbackUrl: pathname,
                reauth: "1",
            });
            router.replace(`/login?${params.toString()}`);
        }
    }, [isLoading, user, pathname, router]);

    return { user, isLoading };
}
