"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as fetchEndpoints from "@/lib/fetch_endpoints";
import { User } from "@/types/user";
import { refreshAccessToken } from "@/lib/auth_token";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
  refreshUser: async () => {},
});

async function fetchMe(): Promise<{ user: User | null }> {
  try {
    return await fetchEndpoints.fetchCurrentUser();
  } catch (error: any) {
    if (error.response?.status === 401) {
      await refreshAccessToken();
      return await fetchEndpoints.fetchCurrentUser();
    }
    throw error;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const refreshUser = async () => {
    try {
      const data = await fetchMe();
      setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user: loggedUser } = await fetchEndpoints.loginUser(email, password);
      setUser(loggedUser);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Login failed");
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetchEndpoints.logoutUser();
      setUser(null);
      setError(null);
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
