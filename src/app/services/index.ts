import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["X-ORGANIZA-JWT"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

api.interceptors.response.use(
  (response) => response, // If response is successful, return it
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration (status 401)
      Cookies.get("refreshToken");
      // make getRefreshTokenCall
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }

      // if 200 update Cookies
    }
    return Promise.reject(new Error(error));
  }
);

export default api;
