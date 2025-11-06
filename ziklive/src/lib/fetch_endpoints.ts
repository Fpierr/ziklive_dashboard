import api from "./api";
import { User } from "../types/user";
import apiPublic from "./apiPublic";

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

function handleApiError(error: any, defaultMessage: string): never {
  if (error.response) {
    const { data, status } = error.response;
    let message = defaultMessage;

    if (status === 400 || status === 409) {
      if (data?.email?.[0]) message = data.email[0];
      else if (data?.detail) message = data.detail;
      else if (data?.error) message = data.error;
      else if (typeof data === "string") message = data;
      else message = "Invalid data provided.";
    } else if (status === 401) {
      message = "Incorrect email or password.";
    } else if (status >= 500) {
      message = "Server error. Please try again later.";
    }

    throw new Error(message);
  } else if (error.request) {
    throw new Error("Network error. Please check your connection.");
  } else {
    throw new Error(defaultMessage);
  }
}

export async function signupUser(name: string, email: string, password: string): Promise<User> {
  try {
    const res = await apiPublic.post("/users/register/promoter/", { name, email, password });
    return res.data;
  } catch (error) {
    handleApiError(error, "Signup failed. Please try again.");
  }
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    const res = await api.post("/users/login/", { email, password });
    return res.data;
  } catch (error) {
    handleApiError(error, "Login failed. Please try again.");
  }
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
