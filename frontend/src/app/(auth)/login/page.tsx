"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/services/auth.service";
import { getApiErrorDetail, isNetworkError } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

/**
 * Only allow same-origin relative paths as post-login destinations.
 * Blocks open-redirect vectors like "https://evil.com" or "//evil.com".
 */
function sanitizeCallbackUrl(raw: string | null): string {
	if (raw && raw.startsWith("/") && !raw.startsWith("//") && !raw.includes("\\")) {
		return raw;
	}
	return "/dashboard";
}

function LoginContent() {
	const toast = useToast();
	const searchParams = useSearchParams();
	const callbackUrl = sanitizeCallbackUrl(searchParams.get("callbackUrl"));

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	// Dynamic front-end constraints checking before dispatching networks tasks
	const validateForm = () => {
		const trimmedEmail = formData.email.trim();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(trimmedEmail)) {
			toast.error("Validation Error", "Please provide a structurally valid email address.", "bottom-right");
			return false;
		}

		if (formData.password.length < 1) {
			toast.error("Validation Error", "Password criteria cannot be blank.", "bottom-right");
			return false;
		}

		return {
			email: trimmedEmail,
			password: formData.password
		};
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Edge Case: Prevent simultaneous duplicate submissions if a thread is active
		if (isLoading) return;

		const validatedPayload = validateForm();
		if (!validatedPayload) return;

		setIsLoading(true);
		setErrorMessage(null);

		// UI Pipeline response notice
		toast.protocol("Authorization", "Verifying credentials with token security gateway...", "bottom-right");

		try {
			/**
			 * NOTE ON BACKEND SCHEMA INTERFACE:
			 * Your OpenAPI specification establishes that /auth/login expects form data layout 
			 * (application/x-www-form-urlencoded) matching fields: username and password.
			 * We map 'email' to 'username' here to ensure native compatibility.
			 */
			await AuthService.login(
				validatedPayload.email,
				validatedPayload.password
			);

			toast.success(
				"Access Granted",
				"Authentication channel initialized. Directing to interface...",
				"bottom-right"
			);

			// Establish secure application routing state — return to the page the
			// user originally requested (proxy.ts sets callbackUrl), else /dashboard.
			// HARD navigation on purpose: router.push() across a proxy/middleware
			// redirect can silently abort, stranding the user on /login. A full
			// document request lets proxy.ts re-evaluate with the fresh cookie.
			window.location.assign(callbackUrl);
		} catch (error: unknown) {
			const detail = getApiErrorDetail(error);
			let extractedMessage =
				detail ?? "Invalid credentials. Please verify your identity data and try again.";

			if (!detail && isNetworkError(error)) {
				// Handle total offline execution / server dropout anomalies
				extractedMessage = "Gateway connection failure. Check your local connection stream.";
			}

			setErrorMessage(extractedMessage);

			toast.error(
				"Authentication Denied",
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
				{/* Branding Headers */}
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
						Welcome back
					</h2>
					<p className="text-brand-blue text-sm font-medium">
						To PlugFit
					</p>
				</div>

				{/* Form Module */}
				<form className="w-full space-y-5 mt-6" onSubmit={handleSubmit} noValidate>

					{/* Real-time Gateway Rejection Banners */}
					{errorMessage && (
						<div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono tracking-wide animate-fadeIn break-words">
							[AUTH_STREAM_DENIED] // {errorMessage}
						</div>
					)}

					{/* Identity Data/Email Address Coordinate */}
					<div className="space-y-2">
						<label className="text-sm font-medium text-brand-yellow" htmlFor="email">
							Your email
						</label>
						<Input
							id="email"
							type="email"
							value={formData.email}
							onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							placeholder="Enter your email"
							disabled={isLoading}
							required
							className="disabled:opacity-40 disabled:cursor-not-allowed transition-all"
						/>
					</div>

					{/* Credential Data/Security Password Coordinate */}
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<label className="text-sm font-medium text-brand-yellow" htmlFor="password">
								Your password
							</label>
							{/* Hook for implementing a forgotten password pipeline recovery later */}
							<Link
								href="/forgot-password"
								className="text-xs text-brand-blue hover:text-brand-yellow transition-colors hover:underline underline-offset-4"
							>
								Forgot password?
							</Link>
						</div>
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

					{/* Operational Submit Action Control */}
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
									<span className="font-mono text-xs tracking-wider uppercase">Validating Session Token...</span>
								</>
							) : (
								"Login"
							)}
						</Button>
					</div>
				</form>

				{/* Secure Route Alternate Gateway Option Footer */}
				<p className="text-sm text-brand-blue mt-6">
					Don&apos;t have an account?{" "}
					<Link
						href={isLoading ? "#" : "/signup"}
						className={`text-brand-yellow hover:underline underline-offset-4 transition-all ${isLoading ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
							}`}
					>
						Sign up
					</Link>
				</p>
			</div>
		</AuthLayout>
	);
}
export default function LoginPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center font-mono text-xs text-gray-500 tracking-widest">
					CONNECTING SECURITY NETWORK PORT...
				</div>
			}
		>
			<LoginContent />
		</Suspense>
	);
}
