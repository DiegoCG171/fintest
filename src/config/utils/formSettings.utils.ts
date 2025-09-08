import { StoreKey } from "../interfaces/formSettings.interface";
import { PermissionRol } from "../interfaces/security.interface";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getInitialFormData = (storeKey: StoreKey, adminState: any) => {
  const { updateUser, updateInstitution, updateRol, updatePermission, permissions } = adminState;

  switch (storeKey) {
    case "updateUser":
      return {
        id: updateUser?.id ?? "",
        names: updateUser?.names ?? "",
        surnames: updateUser?.surnames ?? "",
        username: updateUser?.username ?? "",
        email: updateUser?.email ?? "",
        status: updateUser?.status ?? "",
      };
    
    case "updateInstitution":
      return {
        id: updateInstitution?.id ?? "",
        name: updateInstitution?.name ?? "",
        description: updateInstitution?.description ?? "",
      };
    
    case "updateRol":
      return {
        id: updateRol?.id ?? "",
        name: updateRol?.name ?? "",
        description: updateRol?.description ?? "",
        permissionId: (updateRol?.permissions ?? [])
          .map((perm: PermissionRol) => {
            const match = permissions.menuOptions.find(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (p: any) => p.description === perm.description
            );
            return match ? String(match.id) : null;
          })
          .filter(Boolean),
      };
    
    case "updatePermission":
      return {
        id: updatePermission?.id ?? "",
        description: updatePermission?.description ?? "",
        action: updatePermission?.action?.id != null ? String(updatePermission.action.id) : "",
        resource: updatePermission?.resource?.id != null ? String(updatePermission.resource.id) : "",
      };
    
    default:
      return {};
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEntityId = (storeKey: StoreKey, adminState: any): string => {
  const { updateUser, updateInstitution, updateRol, updatePermission } = adminState;
  
  switch (storeKey) {
    case "updateUser": return updateUser?.id || "new";
    case "updateInstitution": return updateInstitution?.id || "new";
    case "updateRol": return updateRol?.id || "new";
    case "updatePermission": return updatePermission?.id || "new";
    default: return "new";
  }
};