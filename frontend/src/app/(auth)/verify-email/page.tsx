"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GradientGraphic } from "@/components/auth/gradient-graphic";
import { useToast } from "@/hooks/use-toast";
import { AuthService } from "@/services/auth.service";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const toast = useToast();

    // Captures the token passed by the email redirect link
    const token = searchParams.get("token");

    // Prevents duplicate token ingestion threads during strict-mode or render loops
    const verificationStarted = useRef(false);

    const [isResending, setIsResending] = useState(false);
    const [email, setEmail] = useState("");
    const [isVerifying, setIsVerifying] = useState(!!token);
    const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "error">(
        token ? "idle" : "idle"
    );

    // Auto-verify effect executes instantly when user lands on page with a token
    useEffect(() => {
        // Guard clause: Exit if no token exists OR if verification has already been initiated
        if (!token || verificationStarted.current) return;

        // Atomically lock verification entry channel
        verificationStarted.current = true;
        setIsVerifying(true);

        const verifyTokenOnBackend = async () => {
            try {
                // Connects directly to your imported production authentication handler
                await AuthService.verifyEmail(token);

                setVerificationStatus("success");
                toast.success(
                    "Identity Authenticated",
                    "Your email address has been verified successfully.",
                    "bottom-right"
                );
            } catch (err) {
                setVerificationStatus("error");
                toast.error(
                    "Verification Failed",
                    "The authorization token is either expired or invalid.",
                    "bottom-right"
                );
            } finally {
                setIsVerifying(false);
            }
        };

        verifyTokenOnBackend();
    }, [token]); // Removed the unstable 'toast' reference to prevent loop triggers

    // Handles POST /auth/resend-verification
    const handleResend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Input Error", "Please provide a valid email address.", "bottom-right");
            return;
        }

        setIsResending(true);
        toast.protocol("Routing Request", `Dispatching fresh validation link to ${email}`, "bottom-right");

        try {
            await AuthService.resendVerification(email);
            setIsResending(false);
            toast.success(
                "Verification Dispatched",
                "A fresh verification token link has been routed to your inbox.",
                "bottom-right"
            );
        } catch (error) {
            toast.error("Resend Failed", "Unable to dispatch verification email. Please try again later.", "bottom-right");
            setIsResending(false);
        }
    };

    return (
        <div className="min-h-screen relative flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 lg:p-16 gap-8 lg:gap-12 overflow-hidden select-none">

            {/* Background Graphic Component */}
            <div className="absolute inset-x-0 bottom-0 h-[125%] pointer-events-none opacity-50">
                <GradientGraphic />
            </div>


            <div className="w-full max-w-md h-auto lg:h-[580px] bg-glass-bg backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 relative flex flex-col justify-center items-center overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                {/* STATE A: Processing Validation Token */}
                {isVerifying && (
                    <div className="w-full flex flex-col items-center justify-center text-center space-y-6 py-6">
                        <div className="relative flex items-center justify-center h-20 w-20">
                            <div className="absolute inset-0 rounded-full border-2 border-t-brand-yellow border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                            <div className="absolute inset-2 rounded-full border border-dashed border-white/10 animate-[spin_12s_linear_infinite]" />
                            <svg className="h-6 w-6 text-brand-yellow animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Authenticating Token</h3>
                            <p className="text-[11px] text-gray-400 max-w-xs font-mono">
                                Running verification signature validation...
                            </p>
                        </div>
                    </div>
                )}

                {/* STATE B: Verification Successful */}
                {!isVerifying && verificationStatus === "success" && (
                    <div className="w-full flex flex-col items-center justify-center text-center space-y-6 py-4 animate-fadeIn">
                        <div className="h-16 w-16 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center shadow-[0_0_30px_rgba(251,235,77,0.1)]">
                            <svg className="h-6 w-6 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-white tracking-tight">Account Synchronized</h3>
                            <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                                Your credentials are verified. Your execution environment is fully authorized.
                            </p>
                        </div>
                        <Button
                            onClick={() => router.push("/dashboard")}
                            className="w-full mt-4 bg-brand-yellow hover:bg-brand-yellow/90 text-black text-xs font-bold tracking-wide h-11 rounded-xl transition-all duration-150 shadow-[0_4px_20px_rgba(251,235,77,0.15)]"
                        >
                            Launch Workspace
                        </Button>
                    </div>
                )}

                {/* STATE C: Static Idle State / Manual Resend (Displays if idle or on verification failure) */}
                {!isVerifying && verificationStatus !== "success" && (
                    <div className="w-full flex flex-col justify-between h-full py-2">
                        <div className="w-full flex flex-col items-center text-center space-y-6 my-auto">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-yellow to-blue-500 opacity-10 blur-xl transition-opacity duration-300" />
                                <div className="h-16 w-16 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-center shadow-inner relative z-10">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-xl font-bold tracking-tight text-white">
                                    {verificationStatus === "error" ? "Verification Unsuccessful" : "Check your payload link"}
                                </h2>
                                <p className="text-xs text-gray-400 max-w-[280px] leading-relaxed">
                                    {verificationStatus === "error" 
                                        ? "The authentication hash code could not be mapped. Request a fresh gateway token here."
                                        : "An activation coordinate link has been dispatched to your email address. Open it to proceed."
                                    }
                                </p>
                            </div>

                            <form onSubmit={handleResend} className="w-full space-y-3 pt-4">
                                <Input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isResending}
                                    className="w-full bg-white border-white/10 h-11 text-xs text-white placeholder-gray-600 focus:border-white/20 focus:ring-0 rounded-xl transition-all font-mono"
                                />
                                <Button
                                    type="submit"
                                    disabled={isResending}
									glass
                                    className="w-full bg-white/5 hover:bg-white/10 text-brand-yellow text-xs font-bold tracking-wide h-11 rounded-xl transition-all border border-white/10 disabled:opacity-50"
                                >
                                    {isResending ? "Generating Token..." : "Resend Verification Email"}
                                </Button>
                            </form>
                        </div>

                        <div className="w-full text-center pt-6 border-t border-white/5">
                            <Link
                                href="/login"
                                className="text-[11px] font-mono text-white hover:text-brand-yellow transition-colors flex items-center justify-center gap-1.5"
                            >
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                                Return to login channel
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-gray-500 tracking-widest">
                    CONNECTING SECURITY NETWORK PORT...
                </div>
            }
        >
            <VerifyEmailContent />
        </Suspense>
    );
}