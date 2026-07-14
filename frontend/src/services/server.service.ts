import { clientApi } from "@/lib/api/client";
import {
  ServerOut,
  CreateServerPayload,
  ScoreSummary,
  ManifestDiff,
  JobOut,
} from "@/types/api";

export const ServerService = {
  async listServers(): Promise<ServerOut[]> {
    const { data } = await clientApi.get<ServerOut[]>("/servers");
    return data;
  },

  async createServer(payload: CreateServerPayload): Promise<ServerOut> {
    const form = new FormData();
    form.append("name", payload.name);
    if (payload.spec_file) form.append("spec_file", payload.spec_file);
    if (payload.spec_url)  form.append("spec_url", payload.spec_url);
    if (payload.base_url)  form.append("base_url", payload.base_url);
    if (payload.upstream_headers) form.append("upstream_headers", payload.upstream_headers);

    const { data } = await clientApi.post<ServerOut>("/servers/", form);
    return data;
  },

  async getServer(id: string): Promise<ServerOut> {
    const { data } = await clientApi.get<ServerOut>(`/servers/${id}`);
    return data;
  },

  async deleteServer(id: string): Promise<void> {
    await clientApi.delete(`/servers/${id}`);
  },

  async getServerScore(id: string): Promise<ScoreSummary> {
    const { data } = await clientApi.get<ScoreSummary>(`/servers/${id}/score`);
    return data;
  },

  async getServerDiff(id: string): Promise<ManifestDiff> {
    const { data } = await clientApi.get<ManifestDiff>(`/servers/${id}/diff`);
    return data;
  },

  async getServerJobs(id: string): Promise<JobOut[]> {
    const { data } = await clientApi.get<JobOut[]>(`/servers/${id}/jobs`);
    return data;
  },

  async reprocessServer(id: string): Promise<JobOut> {
    const { data } = await clientApi.post<JobOut>(`/servers/${id}/reprocess`);
    return data;
  },
};