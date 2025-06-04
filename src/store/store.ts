import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from ".";
import { templateSlice } from "./slices/templates/template.slice";
import { rulesSlice } from "./slices/rules/rules.slice";
import { loaderSlice } from "./slices/UI/loader/loader.slice"
import { formBuilderSlice } from "./slices/UI/formBuilder/formBuilder.slice";
import { messagesSlice } from "./slices/messages/messages.slice";
import { collectionSlice } from "./slices/collections/collections.slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        templates: templateSlice.reducer,
        rules: rulesSlice.reducer,
        loader: loaderSlice.reducer,
        formBuilder: formBuilderSlice.reducer,
        messagesReducer: messagesSlice.reducer,
        collections: collectionSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;