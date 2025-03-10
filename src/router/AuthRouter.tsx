import { Navigate, Route, Routes } from "react-router-dom"
import { authRoutes } from "./routes/"

export const AuthRouter = () => {
  return (
    <Routes>
        {
            authRoutes.map(({ label: name, path, component:Component }) => (
                <Route key={name} path={path} element={<Component />} />
              ))
        }
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
  )
}
