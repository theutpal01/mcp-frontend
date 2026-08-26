"use client";

import React, { useState } from "react";
import { Navigation } from "./navigation";
import { DashboardWorkspace } from "./dashboard-workspace";
import { ProfileWorkspace } from "./profile-workspace";
import { UserOut } from "@/types/api";
import { MCPContextNexusBackground } from "../auth/reactive-background";
import { ProjectsWorkspace } from "./projects-workspace";

interface DashboardViewProps {
	user: UserOut | null;
	onLogout?: () => void;
	glassLayout?: boolean;
}

export function DashboardView({ user = null, onLogout, glassLayout = true }: DashboardViewProps) {
	const [activeTab, setActiveTab] = useState("Dashboard");

	return (
		< div className="h-[100dvh] overflow-hidden text-white flex flex-col md:flex-row font-sans select-none antialiased w-full pb-16 md:pb-0" >
			<MCPContextNexusBackground />
			{/* Structural Responsive Sidebar/Bottom Navbar Framework */}
			{/* Now constrained by the parent's fixed height, it will not scroll. */}
			<Navigation
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				user={user}
				onLogout={onLogout}
			/>

			{/* --- DASHBOARD MAIN PLATFORM PANEL SPACE --- */}
			{/* flex-1 lets it fill remaining space, overflow-y-auto makes it the only scrollable area */}
			<main className="flex-1 overflow-y-auto relative w-full flex flex-col justify-start">
				{/* Background Ambient Radial Blur Shimmer Glow */}
				<div className="absolute top-0 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-blue/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

				{/* Unified Tab Router Component Delivery Block */}
				{activeTab === "Dashboard" ? (
					<DashboardWorkspace
						glassLayout={glassLayout}
						user={user}
					/>
				) : activeTab === "Projects" ? (
					<ProjectsWorkspace />
				) : (
					<ProfileWorkspace />
				)}
			</main>
		</div >
	);
}