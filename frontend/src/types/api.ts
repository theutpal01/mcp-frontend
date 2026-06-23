export interface UserCreate {
  name: string;
  email: string;
  password?: string;
}

export interface UserOut {
  id: string;
  name: string;
  email: string;
  slug: string;
  plan: string;
  is_active: boolean;
  is_email_verified: boolean;
  created_at: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface ServerOut {
  id: string;
  tenant_id: string;
  name: string;
  slug: string;
  status: string;
  spec_source: string;
  score_before: number | null;
  score_after: number | null;
  tool_count_before: number | null;
  tool_count_after: number | null;
  base_url: string | null;
  mcp_path: string;
  created_at: string;
  updated_at: string;
}

export interface CreateServerPayload {
  name: string;
  spec_file?: File | null;
  spec_url?: string | null;
  base_url?: string | null;
  upstream_headers?: string | null; // Encoded JSON string representation
}

export interface ScoreSummary {
  server_id: string;
  name: string;
  score_before: number | null;
  score_after: number | null;
  delta: number | null;
  tool_count_before: number | null;
  tool_count_after: number | null;
  status: string;
}

export interface ToolDiff {
  name: string;
  description_before: string | null;
  description_after: string | null;
  param_count: number;
  changed: boolean;
}

export interface ManifestDiff {
  server_id: string;
  tools_before: number;
  tools_after: number;
  tools_removed: string[];
  tools_merged: string[];
  diffs: ToolDiff[];
}

export interface JobOut {
  id: string;
  server_id: string;
  status: string;
  stage: string;
  logs: Record<string, any>[];
  error: string | null;
  created_at: string;
  updated_at: string;
}

export interface HTTPValidationError {
  detail?: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
    ctx?: Record<string, any>;
  }>;
}