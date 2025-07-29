import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { AppStore } from "../store/store";
import { logout } from "../store";
import { renewTokenThunk } from "../store/slices/auth/renewTokenThunk.thunk";
import { emitToast } from "../config/utils/toastEmitter";

const ONE_MINUTE_IN_SECONDS = 60;

interface JwtPayload {
  exp: number;
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];
let latestToken: string | null = null;

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

export const setupAxiosInterceptors = (api: AxiosInstance, store: AppStore) => {
  api.interceptors.request.use(
    async (
      config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {
      const token = localStorage.getItem("token");

      if (!token) {
        return config;
      }

      const decoded: JwtPayload = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeft = decoded.exp - currentTime;

      if (timeLeft <= 0) {
        store.dispatch(logout());
        return Promise.reject(new Error("Token expired"));
      }

      if (timeLeft <= ONE_MINUTE_IN_SECONDS) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((newToken) => {
              config.headers.Authorization = `Bearer ${newToken}`;
              resolve(config);
            });
          });
        }

        isRefreshing = true;
        try {
          const newToken = await store.dispatch(renewTokenThunk()).unwrap();

          latestToken = newToken;
          localStorage.setItem("token", newToken);
          onRefreshed(newToken);
          config.headers.Authorization = `Bearer ${newToken}`;
        } catch (err) {
          emitToast("Error al renovar token", "error");
          store.dispatch(logout());
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (latestToken) {
        config.headers.Authorization = `Bearer ${latestToken}`;
      }

      return config;
    },
    (error: AxiosError) => {
      console.error("🚨 Axios request error:", error);
      return Promise.reject(error);
    }
  );
};
