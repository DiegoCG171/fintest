import { Navigate, useLocation } from "react-router-dom";

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const rawFromCategories = localStorage.getItem('fromCategories');
  const fromCategories = rawFromCategories ? JSON.parse(rawFromCategories) : null;
  const rawFromCollections = localStorage.getItem('fromCollections');
  const fromCollections = rawFromCollections ? JSON.parse(rawFromCollections) : null;

  const currentPath = location.pathname.slice(1);

  const ALWAYS_ALLOWED = ["main", "home"];

  const isValid =
    ALWAYS_ALLOWED.includes(currentPath) ||
    fromCategories.includes(currentPath) ||
    fromCollections.includes(currentPath);

  if (!isValid) {
    return <Navigate to="/not-found" />;
  }

  return <>{children}</>;
};

export default RouteGuard;
