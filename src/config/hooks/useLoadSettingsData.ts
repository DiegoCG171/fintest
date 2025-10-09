import { useEffect } from "react";
import { hasPermission } from "../utils/permissions";
import { getAllUsersThunk, useAppDispatch} from "../../store";
import { getAllInstitutionsThunk } from "../../store/slices/institutions/institutions.thunk";
import { getAllSecurityActionsThunk, getAllSecurityPermissionsThunk, getAllSecurityResourcesThunk, getAllSecurityRolesThunk } from "../../store/slices/security/security.thunk";
import { useAuth } from "./useAuth";
import { getAllRulesThunk } from "../../store/slices/rules/rules.thunk";

export const useLoadSettingsData = () => {
  const dispatch = useAppDispatch();
  const { permissions: userPermissions } = useAuth();

  useEffect(() => {
    if (hasPermission(userPermissions, "read", "user")) {
      dispatch(getAllUsersThunk());
    }
    if (hasPermission(userPermissions, "read", "institution")) {
      dispatch(getAllInstitutionsThunk());
    }
    if (hasPermission(userPermissions, "read", "rol")) {
      dispatch(getAllSecurityRolesThunk());
    }
    if (hasPermission(userPermissions, "read", "permission")) {
      dispatch(getAllSecurityPermissionsThunk());
    }
    if (hasPermission(userPermissions, "read", "rol")) {
      dispatch(getAllRulesThunk());
    }
    dispatch(getAllSecurityActionsThunk());
    dispatch(getAllSecurityResourcesThunk());
  }, [dispatch, userPermissions]);
}

