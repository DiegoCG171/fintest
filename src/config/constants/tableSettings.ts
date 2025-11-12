import { RouteType } from "../interfaces/tableSettings.interface";

export const ROUTES = {
  USERS: "/settings/users" as const,
  INSTITUTIONS: "/settings/institutions" as const,
  ROLES: "/settings/roles" as const,
  PERMISSIONS: "/settings/permissions" as const,
  RULES: "/settings/rule" as const,
} as const;

export const RESOURCE_MAP: Record<RouteType, string> = {
  [ROUTES.USERS]: "user",
  [ROUTES.INSTITUTIONS]: "institution", 
  [ROUTES.ROLES]: "rol",
  [ROUTES.PERMISSIONS]: "permission",
  [ROUTES.RULES]: "rule",
};

export const PAGINATION_OPTIONS = [5, 10, 25];