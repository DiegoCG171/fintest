import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { hasAllPermissions, hasPermission, hasSomePermission } from "../utils/permissions";


type SinglePermissionProps = {
  action: string;
  resource: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  redirect?: boolean; // si se usa para rutas
};

type MultiplePermissionProps = {
  permissions: { action: string; resource: string }[];
  requireAll?: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  redirect?: boolean; // si se usa para rutas
};

type Props = SinglePermissionProps | MultiplePermissionProps;

const PermissionGuard = (props: Props) => {
  const { permissions: userPermissions } = useAuth();

  const {
    fallback = null,
    redirectTo = "/unauthorized",
    redirect = false,
    children,
  } = props;

  let allowed = false;

  if ("permissions" in props) {
    const { permissions, requireAll = false } = props;
    allowed = requireAll
      ? hasAllPermissions(userPermissions, permissions)
      : hasSomePermission(userPermissions, permissions);
  } else {
    allowed = hasPermission(userPermissions, props.action, props.resource);
  }

  // Si no tiene permiso
  if (!allowed) {
    // Si se usa como route guard → redirecciona
    if (redirect) {
      return <Navigate to={redirectTo} />;
    }
    // Si es componente → oculta (o muestra fallback)
    return fallback ?? null;
  }

  return <>{children}</>;
};

export default PermissionGuard;

