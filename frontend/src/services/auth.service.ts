import { api } from "@/lib/api/axios-client";
import { UserCreate, UserOut, Token } from "@/types/api";

export const AuthService = {
  async register(payload: UserCreate): Promise<UserOut> {
    const { data } = await api.post<UserOut>("/auth/register", payload);
    return data;
  },

  async login(username: string, password: string): Promise<Token> {
    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    const { data } = await api.post<Token>("/auth/login", form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return data;
  },

  async verifyEmail(token: string): Promise<Record<string, string>> {
    const { data } = await api.get<Record<string, string>>(`/auth/verify-email?token=${token}`);
    return data;
  },

  async resendVerification(email: string): Promise<Record<string, string>> {
    const { data } = await api.post<Record<string, string>>("/auth/resend-verification", { email });
    return data;
  },

  async requestPasswordReset(email: string): Promise<Record<string, string>> {
    const { data } = await api.post<Record<string, string>>("/auth/forgot-password", { email });
    return data;
  },

  async getMe(): Promise<UserOut> {
    const { data } = await api.get<UserOut>("/auth/me");
    return data;
  },

  async updateProfile(payload: { name: string }): Promise<UserOut> {
    const { data } = await api.patch<UserOut>("/auth/me", payload);
    return data;
  },

  async refresh(): Promise<Token> {
    const { data } = await api.post<Token>("/auth/refresh");
    return data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },
};