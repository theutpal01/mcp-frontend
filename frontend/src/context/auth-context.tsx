"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "@/services/auth.service";
import { useRouter, usePathname } from "next/navigation";
import { UserOut } from "@/types/api";


interface AuthContextType {
    user: UserOut | null;
    isLoading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserOut | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const refreshUser = async () => {
        try {
            // Checks if a token cookie exists by testing against the GET /auth/me route
            const userData = await AuthService.getMe();
            setUser(userData);
        } catch (error) {
            // Token is either expired, tampered with, or missing entirely
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Hydrate user info on initial mount or when hitting distinct parent route segments
    useEffect(() => {
        // Skip calling auth/me if the user is explicitly browsing unauthenticated public portals
        const isAuthRoute = ["/login", "/signup", "/verify-email"].includes(pathname);
        if (isAuthRoute && !user) {
            setIsLoading(false);
            return;
        }

        refreshUser();
    }, [pathname]);

    const logout = async () => {
        setIsLoading(true);
        try {
            await AuthService.logout(); // Terminate server-side authorization stream
        } catch (err) {
            console.error("Logout execution error:", err);
        } finally {
            // Force break authorization token client storage strings completely
            document.cookie = "plugfit_access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
            setUser(null);
            setIsLoading(false);
            router.refresh();
            router.push("/login");
        }
    };

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