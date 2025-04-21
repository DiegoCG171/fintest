import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const PublicGuard = () => {
  const isAuthenticated = useAppSelector((state) => state.authReducer.isAuthenticated);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/main" />;
};

export default PublicGuard;