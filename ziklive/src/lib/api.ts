import axios from "axios";
import { getCookie } from "@/utils/cookies";
import { API_URL } from "./config";
import { setupAxiosInterceptors } from "./refresh_auto";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Client-Type": "web"
  },
});

instance.interceptors.request.use((config) => {
  const csrfToken = getCookie("csrf_token");

  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});


setupAxiosInterceptors(instance);

export default instance;
