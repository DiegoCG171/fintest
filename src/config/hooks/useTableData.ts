// hooks/useTableData.ts
import { useMemo } from "react";
import { useAppSelector } from "../../store";
import { ROUTES } from "../constants/tableSettings";

export const useTableData = () => {
  const { users, institutions, roles, permissions } = useAppSelector(
    (state) => state.admin
  );

  return useMemo(() => ({
    [ROUTES.USERS]: {
      data: users?.data ?? [],
      pagination: {
        total: users?.totalSearch ?? 0,
        totalAll: users?.total ?? 0,
        limit: users?.limit ?? 10,
        page: users?.page ?? 1,
        pages: users?.pages ?? 1,
      },
    },
    [ROUTES.INSTITUTIONS]: {
      data: institutions?.data ?? [],
      pagination: {
        total: institutions?.totalSearch ?? 0,
        totalAll: institutions?.total ?? 0,
        limit: institutions?.limit ?? 10,
        page: institutions?.page ?? 1,
        pages: institutions?.pages ?? 1,
      },
    },
    [ROUTES.ROLES]: {
      data: roles?.data ?? [],
      pagination: {
        total: roles?.totalSearch ?? 0,
        totalAll: roles?.total ?? 0,
        limit: roles?.limit ?? 10,
        page: roles?.page ?? 1,
        pages: roles?.pages ?? 1,
      },
    },
    [ROUTES.PERMISSIONS]: {
      data: permissions?.data ?? [],
      pagination: {
        total: permissions?.totalSearch ?? 0,
        totalAll: permissions?.total ?? 0,
        limit: permissions?.limit ?? 10,
        page: permissions?.page ?? 1,
        pages: permissions?.pages ?? 1,
      },
    },
  }), [users, institutions, roles, permissions]);
};