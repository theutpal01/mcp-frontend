import Link from "next/link";
import Image from "next/image";

export function Navbar() {
	return (
		<nav className="fixed top-0 inset-x-0 h-16 border-b border-glass-border bg-background/60 backdrop-blur-md z-50">
			<div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
				{/* Brand Logo Identity */}
				<Link href="/" className="flex items-center gap-2">
					<Image src="/logo.svg" alt="PlugFit Logo" width={20} height={20} className="w-10 h-10" />
					<span className="font-bold text-white tracking-wide text-lg">PlugFit</span>
				</Link>

				{/* Dynamic CTAs */}
				<div className="flex items-center space-x-4">
					<Link href="/login" className="text-sm text-brand-blue hover:text-brand-blue/80 transition font-medium">
						Sign In
					</Link>
					<Link
						href="/signup"
						className="px-4 py-2 rounded-lg bg-brand-darkBtn text-brand-yellow text-sm font-medium border border-glass-border hover:bg-brand-darkBtn/80 transition"
					>
						Get Started
					</Link>
				</div>
			</div>
		</nav>
	);
}