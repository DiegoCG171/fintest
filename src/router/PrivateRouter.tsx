import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

type Props = {
  children: ReactNode;
};

export function PrivateRouter({ children }: Props) {
  
  const {user} = useSelector((state: RootState) => state.auth)

  const isAuthenticated = user.id;

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" replace />;
}
