// fetch endpoints
import api from "./api";
import { User } from "../types/user";
import apiPublic from "./apiPublic";

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export async function signupUser(name: string, email: string, password: string): Promise<User> {
  const res = await apiPublic.post("/users/register/promoter/", { name, email, password });
  return res.data;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const res = await api.post("/users/login/", { email, password });
  return res.data;
}

export async function fetchCurrentUser(): Promise<{ user: User | null }> {
  try {
    const res = await api.get("/users/me/");
    return res.data;
  } catch {
    return { user: null };
  }
}

export async function logoutUser(): Promise<void> {
  await api.post("/users/logout/");
}
