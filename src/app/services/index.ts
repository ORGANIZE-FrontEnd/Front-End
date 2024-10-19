import axios, { AxiosResponse } from "axios";
import { isTokenExpired } from "../atoms/useDecodeJwt";
import { LoginResponse } from "../types/Types";
import { saveEncryptedToken } from "./auth/cookieService";
import { getDecryptedToken } from "./auth/loginService";

export const baseURL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    // Decrypt the token asynchronously
    const isExpired = await isTokenExpired();
    let decryptedToken = await getDecryptedToken();
    if (isExpired || !decryptedToken) {
      console.log("INTERCEPTOR: token expired, getting a new one");
      await refreshAccessToken();
    }
    // Set the decrypted token in the request header
    console.log("DECRIPTED TOKEN, setting header... : ", decryptedToken)
    config.headers["X-ORGANIZA-JWT"] = decryptedToken;

    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

const refreshAccessToken = async () => {
  try {
      const response:AxiosResponse<LoginResponse> = await api.post('/refresh-token');
      if (response.status === 201) {
          const newAccessToken = response.data.accessToken.jwt;
          saveEncryptedToken(newAccessToken);
      }
  } catch (error) {
      console.error('Failed to refresh token, invalidating session...', error);  
  }
};


export default api;
