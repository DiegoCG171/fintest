import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { AppStore } from "../store/store";
import { logout } from "../store";
import { renewTokenThunk } from "../store/slices/auth/renewTokenThunk.thunk";

const ONE_MINUTE_IN_SECONDS = 120;

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
  console.log("✅ Token refreshed, notifying subscribers");
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
        console.warn("🚫 No token found in localStorage");
        return config;
      }

      const decoded: JwtPayload = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeft = decoded.exp - currentTime;

      console.log(`⏳ Token expires in ${timeLeft} seconds`);

      if (timeLeft <= 0) {
        console.warn("⛔ Token expired, logging out");
        store.dispatch(logout());
        return Promise.reject(new Error("Token expired"));
      }

      if (timeLeft <= ONE_MINUTE_IN_SECONDS) {
        if (isRefreshing) {
          console.log("🔄 Waiting for ongoing token refresh");
          return new Promise((resolve) => {
            subscribeTokenRefresh((newToken) => {
              config.headers.Authorization = `Bearer ${newToken}`;
              resolve(config);
            });
          });
        }

        isRefreshing = true;
        try {
          console.info("⚠️ Token about to expire, attempting renewal");
          const newToken = await store.dispatch(renewTokenThunk()).unwrap();

          const oldToken = localStorage.getItem("token");
          const oldExp = oldToken ? jwtDecode(oldToken).exp : null;
          const newExp = jwtDecode(newToken).exp;

          console.log("📜 Old token:", oldToken);
          console.log("📜 New token:", newToken);
          console.log("📆 Old exp:", oldExp, "🆕 New exp:", newExp);

          latestToken = newToken;
          localStorage.setItem("token", newToken);
          onRefreshed(newToken);
          config.headers.Authorization = `Bearer ${newToken}`;
        } catch (err) {
          console.error("🔥 Error during token renewal:", err);
          store.dispatch(logout());
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Siempre aseguramos usar el último token
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
