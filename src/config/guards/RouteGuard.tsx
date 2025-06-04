import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store";

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const fromCategories = useAppSelector(
    (state) => state.validRoutes.fromCategories
  );
  const fromCollections = useAppSelector(
    (state) => state.validRoutes.fromCollections
  );

  const currentPath = location.pathname.slice(1);

  const ALWAYS_ALLOWED = ["main"];

  const isValid =
    ALWAYS_ALLOWED.includes(currentPath) ||
    fromCategories.includes(currentPath) ||
    fromCollections.includes(currentPath);

  if (!isValid) {
    return null;
    //return <Navigate to="/not-found" />;
  }

  return <>{children}</>;
};

export default RouteGuard;
