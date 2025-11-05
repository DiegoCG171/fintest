import { AxiosInstance, AxiosError } from "axios";
import { AppStore } from "../../store/store";
import { emitToast } from "../utils/toastEmitter";
import { logoutThunk } from "../../store/slices/auth/login.thunk";


export const setupNetworkErrorInterceptor = (
    api: AxiosInstance,
    store: AppStore
    ) => {
    api.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
        if (error.code === "ERR_NETWORK" || !error.response) {
            emitToast("Servidor no disponible. Revisa tu conexión.", "error");
            store.dispatch(logoutThunk());
            return Promise.reject(error);
        }

        if (error.response?.status === 401) {
            emitToast("Sesión expirada. Inicia sesión nuevamente.", "warning");
            store.dispatch(logoutThunk());
            return Promise.reject(error);
        }

        if (error.response?.status >= 500) {
            emitToast("Error en el servidor. Intenta más tarde.", "error");
            store.dispatch(logoutThunk());
        }

        return Promise.reject(error);
        }
    );
};
