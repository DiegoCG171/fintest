import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from ".";
import { templateSlice } from "./slices/templates/template.slice";
import { rulesSlice } from "./slices/rules/rules.slice";
import { loaderSlice } from "./slices/UI/loader/loader.slice"
import { formBuilderSlice } from "./slices/UI/form/formBuilder.slice";
import { jsonTemplateDraftSlice } from "./slices/UI/form/jsonTemplateDraft.slice";
import { sidebarMenuSlice } from "./slices/UI/sidebarMenu/sidebarMenu.slice";
import { modalFormSlice } from "./slices/UI/form/modalForm.slice";
import { serverSlice } from "./slices/server/server.slice";
import { recoveryPsswSlice } from "./slices/recoveryPssw/recovery.slice";
import { userSlice } from "./slices/users/user.slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        templates: templateSlice.reducer,
        rules: rulesSlice.reducer,
        loader: loaderSlice.reducer,
        formBuilder: formBuilderSlice.reducer,
        jsonTemplate: jsonTemplateDraftSlice.reducer,
        sidebarMenu: sidebarMenuSlice.reducer,
        modalForm: modalFormSlice.reducer,
        server: serverSlice.reducer,
        recovery: recoveryPsswSlice.reducer,
        user: userSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;