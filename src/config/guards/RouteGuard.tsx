import { Navigate, useLocation, useParams } from "react-router-dom";

const validMethods = ["pos", "atm"];
const validTypes = ["acquirer", "emmisor"];

const allowedBasePaths = [
  "pos/acquirer",
  "pos/emmisor",
  "atm/acquirer",
  "atm/emmisor",
];

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { method, type } = useParams();
  const location = useLocation();

  const pathname = location.pathname.slice(1);

  const rawFromCategories = localStorage.getItem("fromCategories");
  const fromCategories: string[] = rawFromCategories
    ? JSON.parse(rawFromCategories)
    : [];

  const rawFromCollections = localStorage.getItem("fromCollections");
  const fromCollections: string[] = rawFromCollections
    ? JSON.parse(rawFromCollections)
    : [];

  const isValidMethod = validMethods.includes(method ?? "");
  const isValidType = validTypes.includes(type ?? "");

  let isValid = false;

  if (!isValidMethod || !isValidType) {
    isValid = false;
  } else if (pathname === `${method}/${type}`) {

    isValid = allowedBasePaths.includes(pathname);
  } else if (pathname.includes("categories/")) {

    isValid = fromCategories.includes(pathname);
  } else if (pathname.includes("collections/")) {

    isValid = fromCollections.includes(pathname);
  }

  if (!isValid) {
    return <Navigate to="/not-found" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
