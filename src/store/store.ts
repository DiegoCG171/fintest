import { configureStore } from "@reduxjs/toolkit";
import { setupAxiosInterceptors } from "../api/setupAxiosInterceptors";
import api from "../api/api";
import { setupNetworkErrorInterceptor } from "../config/interceptors/networkErrorInterceptor";
import rootReducer from "./rootReducer";

export const store = configureStore({
    reducer: rootReducer
});

setupAxiosInterceptors(api, store);
setupNetworkErrorInterceptor(api, store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;