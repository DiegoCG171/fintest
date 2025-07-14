import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store";

const PublicGuard = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
};

export default PublicGuard;