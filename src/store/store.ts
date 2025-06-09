import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./slices/auth/auth.slice";
import { categoriesSlice } from "./slices/categories/categories.slice";
import { formBuilderSlice } from "./slices/UI/form/formBuilder.slice";
import { jsonTemplateDraftSlice } from "./slices/UI/form/jsonTemplateDraft.slice";
import { loaderSlice } from "./slices/UI/loader/loader.slice"
import { messagesSlice } from "./slices/messages/messages.slice";
import { collectionSlice } from "./slices/collections/collections.slice";
import { modalFormSlice } from "./slices/UI/form/modalForm.slice";
import { recoveryPsswSlice } from "./slices/recoveryPssw/recovery.slice";
import { rulesSlice } from "./slices/rules/rules.slice";
import { serverSlice } from "./slices/server/server.slice";
import { sidebarMenuSlice } from "./slices/UI/sidebarMenu/sidebarMenu.slice";
import { tabSlice } from "./slices/UI/tabs/tabs.slice";
import { templateSlice } from "./slices/templates/template.slice";
import { userSlice } from "./slices/users/user.slice";
import { validRoutesSlice } from "./slices/routes/validRoutesSlice.slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        categories: categoriesSlice.reducer,
        formBuilder: formBuilderSlice.reducer,
        collections: collectionSlice.reducer,
        jsonTemplate: jsonTemplateDraftSlice.reducer,
        loader: loaderSlice.reducer,
        messagesReducer: messagesSlice.reducer,
        modalForm: modalFormSlice.reducer,
        recovery: recoveryPsswSlice.reducer,
        rules: rulesSlice.reducer,
        server: serverSlice.reducer,
        sidebarMenu: sidebarMenuSlice.reducer,
        tabs: tabSlice.reducer,
        templates: templateSlice.reducer,
        user: userSlice.reducer,
        validRoutes: validRoutesSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;