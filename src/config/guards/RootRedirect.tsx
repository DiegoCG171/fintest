import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SplashComponent from "../../pages/SplashComponent";

const RootRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Navigate to="/main" /> : <SplashComponent />;
};

export default RootRedirect;