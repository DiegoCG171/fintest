import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const PrivateGuard = () => {
  const isAuthenticated = useAppSelector((state) => state.authReducer.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
};

export default PrivateGuard;