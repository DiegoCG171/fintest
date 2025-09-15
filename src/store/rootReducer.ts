import { combineReducers, UnknownAction } from "@reduxjs/toolkit";
import { logout } from "./slices/auth/auth.slice";

import { authSlice } from "./slices/auth/auth.slice";
import { categoriesSlice } from "./slices/categories/categories.slice";
import { formBuilderSlice } from "./slices/UI/form/formBuilder.slice";
import { jsonTemplateDraftSlice } from "./slices/UI/form/jsonTemplateDraft.slice";
import { loaderSlice } from "./slices/UI/loader/loader.slice";
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
import { validRoutesSlice } from "./slices/routes/validRoutes.slice.slice";
import { testCasesSlice } from "./slices/testCases/testCasesSlice";
import { sessionSlice } from "./slices/sessions/sessionSlice";
import { functionsSelectSlice } from "./slices/functionsSelect/functionsSelect.slice";
import { modalConfirmSessionSlice } from "./slices/UI/confirmSession/modalCoinfirmSession.slice";
import { confirmDeleteModalSlice } from "./slices/UI/confirmDeleteModal/confirmDeleteModal.slice";
import { adminSlice } from "./slices/admin/admin.slice";
import { sidebarMenuSettingsSlice } from "./slices/UI/sidebarMenuSettings/sidebarMenuSettings.slice";
import { institutionSlice } from "./slices/institutions/institutions.slice";
import { securitySlice } from "./slices/security/security.slice";
import { emmisorModalConfigSlice } from "./slices/UI/emmisorModalConfig/emmisorModalConfig.slice";

const appReducer = combineReducers({
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
    validRoutes: validRoutesSlice.reducer,
    testCases: testCasesSlice.reducer,
    session: sessionSlice.reducer,
    functionSelect: functionsSelectSlice.reducer,
    modalConfirmSession: modalConfirmSessionSlice.reducer,
    confirmDeleteModal: confirmDeleteModalSlice.reducer,
    admin: adminSlice.reducer,
    sidebarMenuSettings: sidebarMenuSettingsSlice.reducer,
    institutions: institutionSlice.reducer,
    security: securitySlice.reducer,
    emmisorModalConfig: emmisorModalConfigSlice.reducer
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: UnknownAction) => {
    if (action.type === logout.type) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
