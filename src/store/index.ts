//Hooks
export { useAppDispatch, useAppSelector } from './hooks'

//Autenticación
export { authSlice, logout, clearAuthError } from './slices/auth/auth.slice'
export { loginThunk } from './slices/auth/login.thunk'

//Templates
export { clearTemplateError, clearTemplates } from './slices/templates/template.slice'
export { getTemplatesThunk } from './slices/templates/templates.thunk'

//Rules
export { clearRules, clearRulesError } from './slices/rules/rules.slice'
export { getRulesThunk } from './slices/rules/rules.thunk'

//UI
//----Loader
export { setLoading } from './slices/loader/loader.slice'