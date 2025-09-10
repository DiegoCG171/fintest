// hooks/usePaginationHandlers.ts
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getAllUsersThunk, useAppDispatch } from "../../store";
import { RouteType } from "../interfaces/tableSettings.interface";
import { ROUTES } from "../constants/tableSettings";
import { updateFilters } from "../utils/updateFilters";
import { GetFilters } from "../interfaces";
import { getAllInstitutionsThunk } from "../../store/slices/institutions/institutions.thunk";
import { getAllSecurityPermissionsThunk, getAllSecurityRolesThunk } from "../../store/slices/security/security.thunk";

export const usePaginationHandlers = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    const pathname = location.pathname as RouteType;
    const page = newPage + 1;

    const thunkMap = {
      [ROUTES.USERS]: () => {
        const filters = updateFilters<GetFilters>("userFilters", { page });
        return getAllUsersThunk(filters);
      },
      [ROUTES.INSTITUTIONS]: () => {
        const filters = updateFilters<GetFilters>("institutionFilters", { page });
        return getAllInstitutionsThunk(filters);
      },
      [ROUTES.ROLES]: () => {
        const filters = updateFilters<GetFilters>("roleFilters", { page });
        return getAllSecurityRolesThunk(filters);
      },
      [ROUTES.PERMISSIONS]: () => {
        const filters = updateFilters<GetFilters>("permissionFilters", { page });
        return getAllSecurityPermissionsThunk(filters);
      },
    };

    const thunk = thunkMap[pathname];
    if (thunk) dispatch(thunk());
  }, [dispatch, location.pathname]);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const pathname = location.pathname as RouteType;
    const limit = +event.target.value;

    const thunkMap = {
      [ROUTES.USERS]: () => {
        const filters = updateFilters<GetFilters>("userFilters", { limit });
        return getAllUsersThunk(filters);
      },
      [ROUTES.INSTITUTIONS]: () => {
        const filters = updateFilters<GetFilters>("institutionFilters", { limit });
        return getAllInstitutionsThunk(filters);
      },
      [ROUTES.ROLES]: () => {
        const filters = updateFilters<GetFilters>("roleFilters", { limit });
        return getAllSecurityRolesThunk(filters);
      },
      [ROUTES.PERMISSIONS]: () => {
        const filters = updateFilters<GetFilters>("permissionFilters", { limit });
        return getAllSecurityPermissionsThunk(filters);
      },
    };

    const thunk = thunkMap[pathname];
    if (thunk) dispatch(thunk());
  }, [dispatch, location.pathname]);

  return { handleChangePage, handleChangeRowsPerPage };
};