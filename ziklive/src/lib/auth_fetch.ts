import api from "./api";

export async function authFetch<T = any>(
  url: string,
  options?: { method?: string; data?: any }
): Promise<T> {
  try {
    const response = await api({
      url,
      method: options?.method || "GET",
      data: options?.data,
      withCredentials: true,
    });

    return response.data as T;
  } catch (error) {
    throw error;
  }
}
