"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
	const pathname = usePathname();
	const router = useRouter();

	const getTabFromPathname = (path: string): string => {
		if (path === "/dashboard") return "Dashboard";
		if (path === "/projects") return "View my projects";
		if (path === "/others") return "View others";
		if (path === "/profile") return "Profile";
		if (path === "/profiles") return "View others profile";
		if (path === "/settings") return "Settings";
		
		const mcpMatch = path.match(/^\/dashboard\/projects\/([^/]+)\/mcp\/([^/]+)/);
		if (mcpMatch) {
			return `mcp-detail-${mcpMatch[2]}`;
		}
		
		const projectMatch = path.match(/^\/dashboard\/projects\/([^/]+)/);
		if (projectMatch) {
			return `project-detail-${projectMatch[1]}`;
		}
		
		if (initialMcpId) return `mcp-detail-${initialMcpId}`;
		if (initialProjectId) return `project-detail-${initialProjectId}`;
		
		return "Dashboard";
	};

	const activeTab = getTabFromPathname(pathname);

	const getProjectIdFromPathname = (path: string): string | null => {
		const mcpMatch = path.match(/^\/dashboard\/projects\/([^/]+)\/mcp\/([^/]+)/);
		if (mcpMatch) return mcpMatch[1];
		const projectMatch = path.match(/^\/dashboard\/projects\/([^/]+)/);
		if (projectMatch) return projectMatch[1];
		return initialProjectId;
	};

	const getMcpIdFromPathname = (path: string): string | null => {
		const mcpMatch = path.match(/^\/dashboard\/projects\/([^/]+)\/mcp\/([^/]+)/);
		if (mcpMatch) return mcpMatch[2];
		return initialMcpId;
	};

	const selectedProjectId = getProjectIdFromPathname(pathname);
	const selectedMcpId = getMcpIdFromPathname(pathname);
	const [selectedMcpName, setSelectedMcpName] = useState<string>("data-processor-mcp");

	const handleSelectProject = (projectId: string) => {
		router.push(`/dashboard/projects/${projectId}`);
	};

	const handleSelectMcp = (mcpId: string, mcpName: string) => {
		setSelectedMcpName(mcpName || "data-processor-mcp");
		router.push(`/dashboard/projects/${selectedProjectId}/mcp/${mcpId}`);
	};

	const handleBackToProjectDetail = () => {
		if (selectedProjectId) {
			router.push(`/dashboard/projects/${selectedProjectId}`);
		} else {
			router.push("/projects");
		}
	};

	const handleBackToProjects = () => {
		router.push("/projects");
	};

	const handleTabChange = (tab: string) => {
		if (tab === "Dashboard") {
			router.push("/dashboard");
		} else if (tab === "View my projects" || tab === "Projects") {
			router.push("/projects");
		} else if (tab === "View others") {
			router.push("/others");
		} else if (tab === "Profile") {
			router.push("/profile");
		} else if (tab === "View others profile") {
			router.push("/profiles");
		} else if (tab === "Settings") {
			router.push("/settings");
		}
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