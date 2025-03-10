import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { messagesSlice } from "./messages/messagesSlice";
import { serverSlice } from "./server/serverSlice";
import { uiSlice } from "./ui/uiSlice";
import { templateSlice } from "./templates/templatesSlice";
import { rulesSlice } from "./rules/rulesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    server: serverSlice.reducer,
    messages: messagesSlice.reducer,
    templates: templateSlice.reducer,
    rules: rulesSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
