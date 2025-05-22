import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices";
import { messagesSlice } from "./slices/messages/messages.slice";

export const store = configureStore({
    reducer: {
        authReducer: authSlice.reducer,
        messagesReducer: messagesSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;