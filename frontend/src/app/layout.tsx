import type { Metadata } from "next";
import "@/app/globals.css"; // Ensure Tailwind directives are configured here
import { BackgroundMesh } from "@/components/ui/background-mesh";

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
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#030508] font-sans antialiased text-white min-h-screen flex flex-col">
        {/* Global presentation shell wrapper */}
        <BackgroundMesh>
          {children}
        </BackgroundMesh>
      </body>
    </html>
  );
}