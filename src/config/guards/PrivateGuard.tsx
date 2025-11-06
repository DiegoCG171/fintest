import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch} from "../../store";
import { useEffect } from "react";
import { logout } from "../../store/slices/auth/auth.slice";

const PrivateGuard = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      console.debug("Usuario no autenticado, ejecutando logoutThunk()");
      dispatch(logout());
    }
  }, [isAuthenticated, dispatch]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateGuard;