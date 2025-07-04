import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store";

const RootRedirect = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Navigate to="/main" /> : <Navigate to="/login" />;
};

export default RootRedirect;