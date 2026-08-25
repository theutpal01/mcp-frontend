"use client";

import React, { useState } from "react";
import { Navigation } from "./navigation";
import { DashboardWorkspace } from "./dashboard-workspace";
import { ViewPlaceholder } from "./view-placeholder";
import { UserOut } from "@/types/api";
import { MCPContextNexusBackground } from "../auth/reactive-background";
import { ProjectsWorkspace } from "./projects-workspace";
import { ProjectDetailWorkspace } from "./project-detail-workspace";
import { McpDetailWorkspace } from "./mcp-detail-workspace";

interface DashboardViewProps {
	user: UserOut | null;
	onLogout?: () => void;
	glassLayout?: boolean;
	initialProjectId?: string | null;
	initialMcpId?: string | null;
}

export function DashboardView({
	user = null,
	onLogout,
	glassLayout = true,
	initialProjectId = null,
	initialMcpId = null,
}: DashboardViewProps) {
	const [activeTab, setActiveTab] = useState<string>(
		initialMcpId
			? `mcp-detail-${initialMcpId}`
			: initialProjectId
			? `project-detail-${initialProjectId}`
			: "Dashboard"
	);
	const [selectedProjectId, setSelectedProjectId] = useState<string | null>(initialProjectId);
	const [selectedMcpId, setSelectedMcpId] = useState<string | null>(initialMcpId);
	const [selectedMcpName, setSelectedMcpName] = useState<string>("data-processor-mcp");

	const handleSelectProject = (projectId: string) => {
		setSelectedProjectId(projectId);
		setSelectedMcpId(null);
		setActiveTab(`project-detail-${projectId}`);
	};

	const handleSelectMcp = (mcpId: string, mcpName: string) => {
		setSelectedMcpId(mcpId);
		setSelectedMcpName(mcpName || "data-processor-mcp");
		setActiveTab(`mcp-detail-${mcpId}`);
	};

	const handleBackToProjectDetail = () => {
		setSelectedMcpId(null);
		if (selectedProjectId) {
			setActiveTab(`project-detail-${selectedProjectId}`);
		} else {
			setActiveTab("View my projects");
		}
	};

	const handleBackToProjects = () => {
		setSelectedProjectId(null);
		setSelectedMcpId(null);
		setActiveTab("View my projects");
	};

	const handleTabChange = (tab: string) => {
		if (tab !== "View my projects" && !tab.startsWith("project-detail") && !tab.startsWith("mcp-detail")) {
			setSelectedProjectId(null);
			setSelectedMcpId(null);
		}
		setActiveTab(tab);
	};

	return (
		<div className="min-h-screen text-white flex flex-col md:flex-row font-sans select-none antialiased w-full pb-16 md:pb-0">
			<MCPContextNexusBackground />
			{/* Structural Responsive Sidebar/Bottom Navbar Framework */}
			<Navigation
				activeTab={activeTab}
				setActiveTab={handleTabChange}
				user={user}
				onLogout={onLogout}
			/>

			{/* --- DASHBOARD MAIN PLATFORM PANEL SPACE --- */}
			<main className="flex-1 min-h-[100dvh] flex flex-col justify-start overflow-y-auto relative w-full">
				{/* Background Ambient Radial Blur Shimmer Glow */}
				<div className="absolute top-0 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-blue/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

				{/* Unified Tab Router Component Delivery Block */}
				{activeTab === "Dashboard" ? (
					<DashboardWorkspace
						glassLayout={glassLayout}
						user={user}
					/>
				) : activeTab === "Projects" || activeTab === "View my projects" ? (
					<ProjectsWorkspace onSelectProject={handleSelectProject} />
				) : activeTab.startsWith("mcp-detail") || selectedMcpId ? (
					<McpDetailWorkspace
						mcpId={selectedMcpId || "1"}
						mcpName={selectedMcpName}
						onBack={handleBackToProjectDetail}
					/>
				) : activeTab.startsWith("project-detail") || selectedProjectId ? (
					<ProjectDetailWorkspace
						projectId={selectedProjectId || "1"}
						onBack={handleBackToProjects}
						onSelectMcp={handleSelectMcp}
					/>
				) : (
					<ViewPlaceholder title={activeTab} />
				)}
			</main>
		</div>
	);
}