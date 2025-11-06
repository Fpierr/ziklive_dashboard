import axios from "axios";
import { API_URL } from "./config";

export async function refreshAccessToken(): Promise<{ access: string }> {
  const response = await axios.post(
    `${API_URL}/users/token/refresh-from-cookie/`,
    {},
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json", },
    }
  );

  if (!response.data?.access) {
    throw new Error("Missing Access token.");
  }

  return response.data;
}
