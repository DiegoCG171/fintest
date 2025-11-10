import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { AppStore } from "../store/store";
import { ensureValidToken } from "../services/auth/tokenManager.service";

export const setupAxiosInterceptors = (api: AxiosInstance, store: AppStore) => {
  api.interceptors.request.use(
    async (
      config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {
      const validToken = await ensureValidToken(store);
      if (validToken) {
        config.headers.Authorization = `Bearer ${validToken}`;
      }
      return config;
    },
    (error: AxiosError) => {
      console.error("🚨 Axios request error:", error);
      return Promise.reject(error);
    }
  );
};
