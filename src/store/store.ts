import { configureStore } from "@reduxjs/toolkit";
import { setupAxiosInterceptors } from "../api/setupAxiosInterceptors";
import api from "../api/api";
import rootReducer from "./rootReducer";
import { startInactivityWatcher } from "../services/auth/inactivityWatcher.service";

export const store = configureStore({
    reducer: rootReducer
});

setupAxiosInterceptors(api, store);
startInactivityWatcher(store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;