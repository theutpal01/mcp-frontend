import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SignupPage() {
	return (
		<AuthLayout>
			<div className="flex flex-col items-center space-y-6">
				{/* Icon & Headers */}
				<div className="flex flex-col items-center space-y-2 w-full text-center">
					<Image src="/logo.svg" alt="PlugFit Logo" width={20} height={20} className="w-10 h-10" />
					<h2 className="text-3xl font-semibold text-brand-yellow tracking-wide">
						Get Started
					</h2>
					<p className="text-brand-blue text-sm font-medium">
						Welcome to PlugFit
					</p>
				</div>

				{/* Form */}
				<form className="w-full space-y-5 mt-6">
					<div className="space-y-2">
						<label className="text-sm font-medium text-brand-yellow" htmlFor="email">
							Your email
						</label>
						<Input
							id="email"
							type="email"
							placeholder="user@example.com"
							required
						/>
					</div>

					<div className="space-y-2">
						<label className="text-sm font-medium text-brand-yellow" htmlFor="password">
							Create new password
						</label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							required
						/>
					</div>

					<div className="pt-2">
						<Button type="submit" glass>
							Create new Account
						</Button>
					</div>
				</form>

				{/* Footer Link */}
				<p className="text-sm text-brand-blue mt-6">
					Already have an account?{" "}
					<Link href="/login" className="text-brand-yellow hover:underline underline-offset-4">
						Login
					</Link>
				</p>
			</div>
		</AuthLayout>
	);
}