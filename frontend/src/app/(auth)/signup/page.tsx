"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/services/auth.service";
import { getApiErrorDetail, isNetworkError } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
    const toast = useToast();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    // Form input validation rules matching openapi.json schemas
    const validateForm = () => {
        const trimmedName = formData.name.trim();
        const trimmedEmail = formData.email.trim();

        if (trimmedName.length < 1 || trimmedName.length > 120) {
            toast.error("Validation Error", "Name must be between 1 and 120 characters long.", "bottom-right");
            return false;
        }

        // Basic structural email regex check before executing transmission
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            toast.error("Validation Error", "Please provide a structurally valid email address.", "bottom-right");
            return false;
        }

        if (formData.password.length < 8) {
            toast.error("Validation Error", "Security threshold not met. Password must be at least 8 characters long.", "bottom-right");
            return false;
        }

        return {
            name: trimmedName,
            email: trimmedEmail,
            password: formData.password
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Edge Case: Prevent simultaneous duplicate submissions if a thread is already active
        if (isLoading) return;

        const validatedPayload = validateForm();
        if (!validatedPayload) return;

        setIsLoading(true);

        // Protocol status notice for low-latency visual feedback
        toast.protocol("Initialization", "Routing registration request packet to secure gateway auth stream...", "bottom-right");

        try {
            // Invokes the server POST /auth/register endpoint with sanitized payloads
            await AuthService.register(validatedPayload);
            
            toast.success(
                "Account Provisioned", 
                "Your authorization credentials have been successfully initialized. Check your inbox for a secure verification coordinate link.", 
                "bottom-right"
            );

            // Redirect user to the verification pipeline page, carrying the
            // email so the resend form is pre-filled (no retyping).
            router.push(`/verify-email?email=${encodeURIComponent(validatedPayload.email)}`);
        } catch (error: unknown) {
            const detail = getApiErrorDetail(error);
            let extractedMessage =
                detail ?? "Invalid credentials. Please verify your data stream configuration and try again.";

            if (!detail && isNetworkError(error)) {
                // Edge Case: Handle network disconnection / gateway timeouts entirely
                extractedMessage = "Network execution failure. Unable to reach security gateway.";
            }
                        
            toast.error(
                "Registration Terminated", 
                extractedMessage, 
                "bottom-right"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="flex flex-col items-center space-y-6 select-none">
                {/* Branding Core Header */}
                <div className="flex flex-col items-center space-y-2 w-full text-center">
                    <Image 
                        src="/logo.svg" 
                        alt="PlugFit Logo" 
                        width={40} 
                        height={40} 
                        className="w-10 h-10 select-none pointer-events-none" 
                        priority
                    />
                    <h2 className="text-3xl font-semibold text-brand-yellow tracking-wide">
                        Get Started
                    </h2>
                    <p className="text-brand-blue text-sm font-medium">
                        Welcome to PlugFit
                    </p>
                </div>

                {/* Form Wrapper Panel */}
                <form className="w-full space-y-5 mt-6" onSubmit={handleSubmit} noValidate>
                    {/* Name Input Element (UserCreate Limit: 120 chars max) */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-yellow" htmlFor="name">
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            disabled={isLoading}
                            required
                            maxLength={120}
                            className="disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        />
                    </div>

                    {/* Email Input Element */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-yellow" htmlFor="email">
                            Your email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="user@example.com"
                            disabled={isLoading}
                            required
                            className="disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        />
                    </div>

                    {/* Password Input Element (UserCreate Limit: 8 chars min) */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-yellow" htmlFor="password">
                            Create new password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            disabled={isLoading}
                            required
                            className="disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        />
                    </div>

                    {/* Interactive Operational Submit Button Component */}
                    <div className="pt-2">
                        <Button 
                            type="submit" 
                            glass 
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 h-11 transition-all"
                        >
                            {isLoading ? (
                                <>
                                    <span className="h-4 w-4 rounded-full border-2 border-t-transparent border-white/80 animate-spin" />
                                    <span className="font-mono text-xs tracking-wider uppercase">Provisioning Channel...</span>
                                </>
                            ) : (
                                "Create new Account"
                            )}
                        </Button>
                    </div>
                </form>

                {/* Secure Routing Footer Link */}
                <p className="text-sm text-brand-blue mt-6">
                    Already have an account?{" "}
                    <Link 
                        href={isLoading ? "#" : "/login"} 
                        className={`text-brand-yellow hover:underline underline-offset-4 transition-all ${
                            isLoading ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
                        }`}
                    >
                        Login
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}