import React from "react";
import { GradientGraphic } from "./gradient-graphic";
import { TiltCard } from "@/components/ui/tilt-card";
import { MCPContextNexusBackground } from "./reactive-background";

export function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen relative  flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 lg:p-16 gap-8 lg:gap-12 overflow-hidden select-none">
			<MCPContextNexusBackground />
			{/* <div className="absolute hidden lg:block inset-x-0 bottom-0 h-full w-full opacity-50">
				<GradientGraphic position="bottom" isReversed={false} />
			</div> */}

			{/* LEFT HAND CARD: Hidden on Mobile, Flex on Desktop */}
			{/* <div className="hidden lg:flex w-full max-w-md lg:h-[580px] p-8 sm:p-10 relative flex-col justify-between overflow-hidden"> */}
			<div className="hidden lg:flex w-full max-w-md lg:h-[580px] bg-glass-bg backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 relative flex-col justify-between overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
				<div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
				<div className="relative z-10">
					<h1 className="text-3xl font-medium text-brand-yellow leading-tight tracking-wide text-left max-w-xs">
						MCPs that AI Agents can actually use.
					</h1>

				</div>
				<div className="absolute hidden lg:block inset-x-0 bottom-0 h-full w-full opacity-50">
					<GradientGraphic position="bottom" isReversed={false} />
				</div>

			</div>

			{/* RIGHT HAND CARD: Main interactive area with premium glassmorph look and white edges */}
			<TiltCard
				maxRotation={4}
				scale={1.01}
				className="w-full max-w-md min-h-[540px] lg:h-[580px] bg-glass-bg backdrop-blur-xl border border-white/15 rounded-3xl p-8 sm:p-10 pt-24 sm:pt-28 lg:pt-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col justify-center relative overflow-hidden"
			>
				{/* Specular premium white top edge line highlight */}
				<div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

				{/* Mobile/Tablet Only Header Accent: Hanging down, Horizontally Flipped */}
				<div className="lg:hidden absolute inset-x-0 top-0 h-full w-full pointer-events-none">
					<GradientGraphic position="top" isReversed={true} />
				</div>

				{/* Content Layer raised safely above background effects */}
				<div className="relative z-10 w-full">
					{children}
				</div>
			</TiltCard>

		</div>
	);
}