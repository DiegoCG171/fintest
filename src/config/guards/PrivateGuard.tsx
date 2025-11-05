import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch} from "../../store";
import { useEffect } from "react";
import { logoutThunk } from "../../store/slices/auth/login.thunk";

const PrivateGuard = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      console.debug("Usuario no autenticado, ejecutando logoutThunk()");
      dispatch(logoutThunk());
    }
  }, [isAuthenticated, dispatch]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateGuard;