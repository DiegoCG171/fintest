import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from ".";
import { templateSlice } from "./slices/templates/template.slice";
import { rulesSlice } from "./slices/rules/rules.slice";
import { loaderSlice } from "./slices/loader/loader.slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        templates: templateSlice.reducer,
        rules: rulesSlice.reducer,
        loader: loaderSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;