import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { useEffect } from "react";
import { logoutThunk } from "../../store/slices/auth/login.thunk";
import { getConfigUserThunk } from "../../store/slices/users/userConfiguration.thunk";

const PrivateGuard = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      console.debug("Usuario no autenticado, ejecutando logout()");
      dispatch(logoutThunk());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getConfigUserThunk(user.id));
    }
  }, [dispatch, user?.id]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateGuard;
