import { AppStore } from "../../store/store";
import { ensureValidToken, getTokenTimeLeft } from "./tokenManager.service";


const CHECK_INTERVAL_MS = 30 * 1000; 
const REFRESH_THRESHOLD = 60; 
const MAX_IDLE_BEFORE_SKIP = 5 * 60 * 1000; 

let lastActivity = Date.now();
let intervalId: NodeJS.Timeout | null = null;

function resetActivity() {
    lastActivity = Date.now();
}

export function startInactivityWatcher(store: AppStore) {
    if (intervalId) return; 

    ["click", "keydown", "mousemove", "scroll"].forEach((evt) =>
        window.addEventListener(evt, resetActivity)
    );

    intervalId = setInterval(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const timeLeft = getTokenTimeLeft(token);
        const idleMs = Date.now() - lastActivity;

        if (timeLeft <= REFRESH_THRESHOLD && idleMs < MAX_IDLE_BEFORE_SKIP) {
            await ensureValidToken(store);
        }
    }, CHECK_INTERVAL_MS);
}

export function stopInactivityWatcher() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;

    ["click", "keydown", "mousemove", "scroll"].forEach((evt) =>
        window.removeEventListener(evt, resetActivity)
    );
}
