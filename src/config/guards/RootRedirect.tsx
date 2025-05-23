import { Navigate } from "react-router-dom";
import SplashComponent from "../../pages/SplashComponent";
import { useAppSelector } from "../../store";

const RootRedirect = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Navigate to="/main" /> : <SplashComponent />;
};

export default RootRedirect;