
// utils/permissions.ts
export function hasPermission(
  permissions: string[],
  action: string,
  resource: string
): boolean {
  return permissions.includes(`${action}:${resource}`);
}

export function hasSomePermission(
  permissions: string[],
  required: { action: string; resource: string }[]
): boolean {
  return required.some(p =>
    hasPermission(permissions, p.action, p.resource)
  );
}

export function hasAllPermissions(
  permissions: string[],
  required: { action: string; resource: string }[]
): boolean {
  return required.every(p =>
    hasPermission(permissions, p.action, p.resource)
  );
}
