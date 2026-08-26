// components/dashboard/profile-workspace.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BadgeCheck, CalendarDays, MailWarning, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { AuthService } from "@/services/auth.service";
import { getApiErrorDetail } from "@/lib/utils";

function formatDate(iso: string): string | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function ProfileWorkspace() {
  const { user, refreshUser } = useAuth();
  const toast = useToast();

  const [nameDraft, setNameDraft] = useState(user?.name ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!user) return null;

  const displayName = user.name || "User";
  const isDirty = nameDraft.trim() !== user.name && nameDraft.trim().length > 0;
  const memberSince = formatDate(user.created_at);

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;

    const trimmed = nameDraft.trim();
    if (trimmed.length < 1 || trimmed.length > 120) {
      setFormError("Name must be between 1 and 120 characters.");
      return;
    }
    if (trimmed === user.name) {
      setFormError(null);
      return;
    }

    setFormError(null);
    setIsSaving(true);

    try {
      await AuthService.updateProfile({ name: trimmed });
      await refreshUser();
      toast.success("Profile Updated", "Your display name has been saved.", "bottom-right");
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      let message = getApiErrorDetail(err) ?? "Failed to update your profile. Please try again.";
      if (status === 404 || status === 405) {
        message = "Profile updates aren't supported by the backend API yet.";
      }
      setFormError(message);
      toast.error("Update Failed", message, "bottom-right");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6 bg-transparent text-white p-4 sm:p-6 min-h-full overflow-y-auto relative select-none z-10 max-w-3xl mx-auto">

      {/* --- HERO IDENTITY CARD --- */}
      <section className="relative overflow-hidden border border-slate-900 bg-brand-blue/10 backdrop-blur-md rounded-[28px] p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-blue/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-brand-blue/30 to-blue-950/60 border border-blue-500/25 flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_30px_rgba(0,123,255,0.2)]">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <span
              className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-[3px] border-[#04101f] ${
                user.is_active ? "bg-[#d4ff00] shadow-[0_0_10px_#d4ff00]" : "bg-red-500"
              }`}
              role="img"
              aria-label={user.is_active ? "Account active" : "Account inactive"}
            />
          </div>

          {/* Identity Meta */}
          <div className="space-y-2.5 min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-white break-words select-text">
              {displayName}
            </h1>
            <p className="text-sm font-mono text-blue-400/70 break-all select-text">{user.email}</p>

            {memberSince && (
              <p className="text-xs font-mono text-blue-400/40 flex items-center gap-1.5 justify-center sm:justify-start">
                <CalendarDays className="w-3.5 h-3.5" />
                Member since {memberSince}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow">
                {user.plan ? user.plan.toUpperCase() : "FREE"} PLAN
              </span>
              {user.is_email_verified ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase bg-green-500/10 border border-green-500/30 text-green-400">
                  <BadgeCheck className="w-3 h-3" />
                  Email Verified
                </span>
              ) : (
                <Link
                  href={`/verify-email?email=${encodeURIComponent(user.email)}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <MailWarning className="w-3 h-3" />
                  Email Unverified — Verify Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- EDIT PROFILE --- */}
      <section className="border border-slate-900/60 bg-brand-blue/10 backdrop-blur-md rounded-[28px] p-6 shadow-xl">
        <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-[#d4ff00] font-mono mb-5">
          Edit Profile
        </h2>

        <form onSubmit={handleSaveName} className="max-w-md space-y-4" noValidate>
          {formError && (
            <div
              role="alert"
              className="flex items-start gap-3 p-3 rounded-xl bg-red-950/30 border border-red-900/40"
            >
              <p className="text-xs font-mono text-red-400/90 break-words">{formError}</p>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="profile-name" className="text-xs font-mono font-medium text-blue-400/70 uppercase tracking-wider block">
              Display Name
            </label>
            <Input
              id="profile-name"
              type="text"
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              placeholder="Your display name"
              disabled={isSaving}
              maxLength={120}
              autoComplete="name"
              className="bg-[#020c1d] border-blue-900/40 text-white focus:border-brand-blue/60 placeholder:text-blue-400/30"
            />
            <p className="text-[10px] font-mono text-blue-400/40">
              Shown across the workspace and on shared projects.
            </p>
          </div>

          <div className="pt-1">
            <Button
              type="submit"
              disabled={isSaving || !isDirty}
              className="w-fit h-10 px-6 rounded-full bg-brand-blue/90 border border-brand-blue/40 text-white hover:bg-brand-blue transition-all duration-200 disabled:opacity-40 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="font-mono text-xs tracking-wider uppercase">Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
