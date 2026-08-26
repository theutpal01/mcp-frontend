"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/services/auth.service";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
	const toast = useToast();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isLoading) return;

		const trimmedEmail = email.trim();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
			toast.error("Validation Error", "Please provide a structurally valid email address.", "bottom-right");
			return;
		}

		setIsLoading(true);
		try {
			await AuthService.requestPasswordReset(trimmedEmail);
			setIsSubmitted(true);
			toast.success("Request Dispatched", "If that address is registered, a reset link is on its way.", "bottom-right");
		} catch {
			// Always respond with the same neutral copy — never confirm whether an account exists
			setIsSubmitted(true);
			toast.protocol("Request Received", "If that address is registered, a reset link is on its way.", "bottom-right");
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
						Reset access
					</h2>
					<p className="text-brand-blue text-sm font-medium">
						Recover your PlugFit credentials
					</p>
				</div>

				{isSubmitted ? (
					/* Post-submission confirmation state */
					<div className="w-full space-y-5 mt-6 text-center">
						<div className="mx-auto h-14 w-14 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center shadow-[0_0_30px_rgba(251,235,77,0.1)]">
							<svg className="h-6 w-6 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
							</svg>
						</div>
						<div className="space-y-1.5">
							<p className="text-sm text-white font-medium">Check your inbox</p>
							<p className="text-xs text-gray-400 leading-relaxed max-w-[280px] mx-auto">
								If <span className="text-brand-blue break-all">{email.trim()}</span> belongs to a PlugFit account,
								a password reset link has been dispatched to it.
							</p>
						</div>
						<Button
							glass
							onClick={() => router.push("/login")}
							className="w-full h-11 rounded-xl"
						>
							Return to login
						</Button>
					</div>
				) : (
					/* Request Form Module */
					<>
						<form className="w-full space-y-5 mt-6" onSubmit={handleSubmit} noValidate>
							<div className="space-y-2">
								<label className="text-sm font-medium text-brand-yellow" htmlFor="reset-email">
									Your email
								</label>
								<Input
									id="reset-email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									disabled={isLoading}
									required
									autoComplete="email"
									className="disabled:opacity-40 disabled:cursor-not-allowed transition-all"
								/>
								<p className="text-[11px] text-gray-500 leading-relaxed">
									We&apos;ll send a secure reset link to this address.
								</p>
							</div>

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
											<span className="font-mono text-xs tracking-wider uppercase">Dispatching...</span>
										</>
									) : (
										"Send reset link"
									)}
								</Button>
							</div>
						</form>

						<p className="text-sm text-brand-blue mt-6">
							Remembered your password?{" "}
							<Link
								href="/login"
								className="text-brand-yellow hover:underline underline-offset-4 transition-all"
							>
								Log in
							</Link>
						</p>
					</>
				)}
			</div>
		</AuthLayout>
	);
}
