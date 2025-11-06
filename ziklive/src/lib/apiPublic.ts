import axios from "axios";
import { API_URL } from "./config";

const apiPublic = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // "X-Client-Type": "web",
  },
});

export default apiPublic;
