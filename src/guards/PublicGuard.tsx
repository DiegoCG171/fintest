import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicGuard = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return !user ? <Outlet /> : <Navigate to="/ecommerce" />;
};

export default PublicGuard;