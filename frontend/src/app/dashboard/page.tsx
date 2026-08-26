"use client";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useRequireAuth } from "@/context/auth-context";

export default function DashboardPage() {
  const toast = useToast();
  // Waits for session hydration, then bounces dead sessions to /login
  // (proxy.ts only sees cookie presence — this covers expired tokens).
  const { user, isLoading } = useRequireAuth();
  const auth = useAuth();

  if (isLoading) {
    return (
      <div className="h-[100dvh] flex items-center justify-center gap-3 text-blue-400/60">
        <LoadingSpinner size="sm" />
        <span className="text-sm font-mono">Restoring your session...</span>
      </div>
    );
  }

  // Delegates to the shared AuthProvider logout — cookie scrubbing,
  // state reset, and redirect all live in one place now.
  const handleLogout = async () => {
    try {
      await auth.logout();
      toast.success("Session Terminated", "You have been logged out securely.", "bottom-right");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout Anomaly", "Failed to gracefully sever the auth stream.", "bottom-right");
    }
  };

  return (
    <DashboardView
      user={user}
      onLogout={handleLogout}
    />
  );
}
