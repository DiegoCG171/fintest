import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from ".";
import { templateSlice } from "./slices/templates/template.slice";
import { rulesSlice } from "./slices/rules/rules.slice";
import { loaderSlice } from "./slices/UI/loader/loader.slice"
import { formBuilderSlice } from "./slices/UI/formBuilder/formBuilder.slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        templates: templateSlice.reducer,
        rules: rulesSlice.reducer,
        loader: loaderSlice.reducer,
        formBuilder: formBuilderSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;