import axios, { InternalAxiosRequestConfig } from "axios";
import { getDecryptedToken } from "./auth/loginService";

export const baseURL = "https://backend-arb4.onrender.com/api";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const token = await getDecryptedToken();
    if (token) {
      config.headers["X-ORGANIZA-JWT"] = token;
    }
    return config;
  },
  (error) => Promise.reject(new Error(error))
);

export default api;
