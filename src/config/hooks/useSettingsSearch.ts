import { useLocation } from "react-router-dom";
import { getAllUsersThunk, useAppDispatch } from "../../store";
import {
  getAllSecurityRolesThunk,
  getAllSecurityPermissionsThunk,
} from "../../store/slices/security/security.thunk";
import { getAllInstitutionsThunk } from "../../store/slices/institutions/institutions.thunk";

export const useSettingsSearch = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const search = (query: string) => {
    if (location.pathname.includes("/settings/users")) {
      dispatch(getAllUsersThunk({ search: query }));
    }
    if (location.pathname.includes("/settings/institutions")) {
      dispatch(getAllInstitutionsThunk({ search: query }));
    }
    if (location.pathname.includes("/settings/roles")) {
      dispatch(getAllSecurityRolesThunk({ search: query }));
    }
    if (location.pathname.includes("/settings/permissions")) {
      dispatch(getAllSecurityPermissionsThunk({ search: query }));
    }
  };

  return { search };
};
