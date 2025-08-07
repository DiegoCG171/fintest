//Hooks
export { useAppDispatch, useAppSelector } from './hooks'

//Autenticación
export { authSlice, logout, clearAuthError } from './slices/auth/auth.slice'
export { loginThunk } from './slices/auth/login.thunk'
export { clearRecoveryState, clearRecoveryError } from './slices/recoveryPssw/recovery.slice'
export * from './slices/recoveryPssw/recovery.thunk'

//Templates
export { clearTemplates, clearTemplateError, clearUpdateError, clearCreateError, clearByIdTemplate, clearByIdTemplateError } from './slices/templates/template.slice'
export { getTemplatesThunk, updateTemplateThunk, createTemplateThunk, getTemplateByIdThunk } from './slices/templates/templates.thunk'

//TestCases
export { addOrUpdateTestCases } from './slices/testCases/testCasesSlice'
export * from './slices/testCases/testCases.thunk'

//Rules
export { clearRules, clearRulesError } from './slices/rules/rules.slice'
export { getRulesThunk } from './slices/rules/rules.thunk'

//Server
export { clearServer, clearServerError, clearStopServer, clearStopServerError } from './slices/server/server.slice'
export { startServerThunk, stopServerThunk} from './slices/server/server.thunk'

//User
export * from './slices/users/user.thunk'

//Categories
export * from './slices/categories/categories.thunk'

//Routes
export * from './slices/routes/validRoutes.slice.slice'

//UI
//----Loader
export { setLoading } from './slices/UI/loader/loader.slice'
export { setConfig, setValuesForTab, updateFieldValue, updateNestedFieldValue, setVisibility } from './slices/UI/form/formBuilder.slice'
export { openModal, closeModal } from './slices/UI/form/modalForm.slice'
export { addTab, removeTab  } from './slices/UI/tabs/tabs.slice'