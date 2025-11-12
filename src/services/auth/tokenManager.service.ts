import { jwtDecode } from "jwt-decode";
import { renewTokenThunk } from "../../store/slices/auth/renewTokenThunk.thunk";
import { emitToast } from "../../config/utils/toastEmitter";
import { AppStore } from "../../store/store";
import { logoutThunk } from "../../store/slices/auth/login.thunk";

interface JwtPayload { exp: number }

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

export function getTokenTimeLeft(token: string): number {
    try {
        const decoded: JwtPayload = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        return decoded.exp - now;
    } catch {
        return 0;
    }
}

export function subscribeTokenRefresh(cb: (token: string) => void) {
    refreshSubscribers.push(cb);
}

export function onRefreshed(token: string) {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
}



export async function ensureValidToken(store: AppStore): Promise<string | null> {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }

    const timeLeft = getTokenTimeLeft(token);

    if (timeLeft <= 0) {
        store.dispatch(logoutThunk());
        return null;
    }

    if (timeLeft > 60) {
        return token;
    }

    if (isRefreshing) {
        return new Promise((resolve) => {
            subscribeTokenRefresh((newToken) => {
                resolve(newToken);
            });
        });
    }

    isRefreshing = true;

    try {
        const newToken = await store.dispatch(renewTokenThunk()).unwrap();
        localStorage.setItem("token", newToken);
        onRefreshed(newToken);
        return newToken;
    } catch (err) {
        emitToast(err as string || "Error al renovar token", "error");
        store.dispatch(logoutThunk());
        return null;
    } finally {
        isRefreshing = false;
    }
}

