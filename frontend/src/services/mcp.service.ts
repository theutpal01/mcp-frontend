import { api } from "@/lib/api/axios-client";

export const McpService = {
  async postMcpPayload(tenantId: string, serverId: string, payload: Record<string, unknown>): Promise<unknown> {
    const { data } = await api.post(`/mcp/${tenantId}/${serverId}`, payload);
    return data;
  },

  async getMcpInfo(tenantId: string, serverId: string): Promise<unknown> {
    const { data } = await api.get(`/mcp/${tenantId}/${serverId}/info`);
    return data;
  },

  /**
   * Generates a streaming connection context string for the client application execution space
   */
  getMcpStreamUrl(tenantId: string, serverId: string): string {
    return `/api/proxy/mcp/${tenantId}/${serverId}`;
  }
};