import { Navigate, Route, Routes } from "react-router-dom";
import { mainRoutes } from "./routes";

export const MainRouter = () => {
  
  return (
      <Routes>
        {
            mainRoutes.map(({ label: name, path, component:Component }) => (
                <Route key={name} path={path} element={<Component />} />
              ))
        }
        <Route path="/*" element={<Navigate to="/home" replace />} />
      </Routes>
  );
};
