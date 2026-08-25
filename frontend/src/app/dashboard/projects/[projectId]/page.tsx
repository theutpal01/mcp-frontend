"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { AuthService } from "@/services/auth.service";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";

export default function ProjectDetailPage({ params }: { params: Promise<{ projectId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const toast = useToast();
  const auth = useAuth();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      document.cookie = "plugfit_access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
      toast.success("Session Terminated", "You have been logged out securely.", "bottom-right");
      router.refresh();
      router.push("/login");
    } catch (error) {
      console.log("Logout Error:", error);
      toast.error("Logout Anomaly", "Failed to gracefully sever the auth stream.", "bottom-right");
    }
  };

  return (
    <DashboardView
      user={auth.user}
      onLogout={handleLogout}
      initialProjectId={resolvedParams.projectId}
    />
  );
}
