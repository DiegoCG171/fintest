import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch, logout } from "../../store";
import { useEffect } from "react";

const PrivateGuard = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      console.debug("Usuario no autenticado, ejecutando logout()");
      dispatch(logout());
    }
  }, [isAuthenticated, dispatch]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateGuard;