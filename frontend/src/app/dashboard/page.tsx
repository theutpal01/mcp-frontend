"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogoutSequence = () => {
    // Gracefully clean session cookies/tokens here if necessary
    router.push("/");
  };

  return (
    <DashboardView 
      userEmail="uses.john@gmail.com" 
      onLogout={handleLogoutSequence}
    />
  );
}