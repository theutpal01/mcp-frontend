import { api } from "@/lib/api/axios-client";
import { ServerOut, CreateServerPayload, ScoreSummary, ManifestDiff, JobOut } from "@/types/api";

export const ServerService = {
  async listServers(): Promise<ServerOut[]> {
    const { data } = await api.get<ServerOut[]>("/servers/");
    return data;
  },

  async createServer(payload: CreateServerPayload): Promise<ServerOut> {
    const formData = new FormData();
    formData.append("name", payload.name);
    
    if (payload.spec_file) {
      formData.append("spec_file", payload.spec_file);
    }
    if (payload.spec_url) {
      formData.append("spec_url", payload.spec_url);
    }
    if (payload.base_url) {
      formData.append("base_url", payload.base_url);
    }
    if (payload.upstream_headers) {
      formData.append("upstream_headers", payload.upstream_headers);
    }

    const { data } = await api.post<ServerOut>("/servers/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  async getServer(serverId: string): Promise<ServerOut> {
    const { data } = await api.get<ServerOut>(`/servers/${serverId}`);
    return data;
  },

  async deleteServer(serverId: string): Promise<void> {
    await api.delete(`/servers/${serverId}`);
  },

  async getServerScore(serverId: string): Promise<ScoreSummary> {
    const { data } = await api.get<ScoreSummary>(`/servers/${serverId}/score`);
    return data;
  },

  async getServerDiff(serverId: string): Promise<ManifestDiff> {
    const { data } = await api.get<ManifestDiff>(`/servers/${serverId}/diff`);
    return data;
  },

  async getServerJobs(serverId: string): Promise<JobOut[]> {
    const { data } = await api.get<JobOut[]>(`/servers/${serverId}/jobs`);
    return data;
  },

  async reprocessServer(serverId: string): Promise<JobOut> {
    const { data } = await api.post<JobOut>(`/servers/${serverId}/reprocess`);
    return data;
  },
};