import type { Metadata } from "next";
import "@/app/globals.css"; // Ensure Tailwind directives are configured here
import { BackgroundMesh } from "@/components/ui/background-mesh";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth-context";
import localFont from "next/font/local";

const helveticaNeue = localFont({
  src: "../../public/fonts/helveticaneue.woff2",
  weight: "400",
  variable: "--font-body",
  display: "swap",
});

const conthrax = localFont({
  src: "../../public/fonts/ConthraxSb-Regular.woff2",
  weight: "600",
  variable: "--font-hero",
  display: "swap",
});

export const metadata: Metadata = {
	title: "PlugFit — Usability Layer for AI Agents",
	description: "Ingest, clean, and validate Model Context Protocol servers.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
  lang="en"
  className={`scroll-smooth ${conthrax.variable} ${helveticaNeue.variable}`}
>
			<body className="bg-[#030508] font-sans antialiased text-white min-h-screen flex flex-col">
				{/* Global presentation shell wrapper */}
				<AuthProvider>
					<BackgroundMesh>
						{children}
						<Toaster
							theme="dark"
							hotkey={["alt", "T"]}
							// gutter={10}
							// Sonner natively handles container constraints perfectly on desktop
							className="pointer-events-none select-none"
							toastOptions={{
								style: { background: "transparent", border: "none", boxShadow: "none" },
								unstyled: true,
							}}
						/>
					</BackgroundMesh>
				</AuthProvider>
			</body>
		</html>
	);
}