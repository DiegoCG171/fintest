import { useState, useCallback, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useTableData } from "./useTableData";
import { usePaginationHandlers } from "./usePaginationHandlers";
import { useTableActions } from "./useTableActions";
import { EntityType, RouteType } from "../interfaces/tableSettings.interface";
import { useTableColumns } from "./useTableColumns";
import { getAllUsersThunk, useAppDispatch, useAppSelector } from "../../store";
import { updateFilters } from "../utils/updateFilters";
import { GetFilters } from "../interfaces";
import { ROUTES } from "../constants/tableSettings";
import { getAllInstitutionsThunk } from "../../store/slices/institutions/institutions.thunk";
import {
  getAllSecurityPermissionsThunk,
  getAllSecurityRolesThunk,
} from "../../store/slices/security/security.thunk";
import { getAllExtractionRulesThunk } from "../../store/slices/extractionsRules/extractionRules.thunk";

export const useDynamicTable = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const tableData = useTableData();
  const { searchTerm } = useAppSelector((state) => state.admin);
  const { handleChangePage, handleChangeRowsPerPage } = usePaginationHandlers();
  const actions = useTableActions();
  const pathname = location.pathname as RouteType;
  const filterKeyMap: Record<RouteType, string> = {
    [ROUTES.USERS]: "userFilters",
    [ROUTES.INSTITUTIONS]: "institutionFilters",
    [ROUTES.ROLES]: "roleFilters",
    [ROUTES.PERMISSIONS]: "permissionFilters",
    [ROUTES.RULES]: 'ruleFilters'
  };

  const storageKey = filterKeyMap[pathname];
  const savedFilters = useMemo(() => {
    return storageKey
      ? JSON.parse(localStorage.getItem(storageKey) || "{}")
      : {};
  }, [storageKey]);

  const [order, setOrder] = useState<"asc" | "desc">(
    savedFilters?.order?.toLowerCase?.() || "asc"
  );
  const [sortBy, setSortBy] = useState(savedFilters?.sortBy || "");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<EntityType | null>(null);

  const config = tableData[pathname];
  const columns = useTableColumns(pathname);

  const handleMenuClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, item: EntityType) => {
      setAnchorEl(e.currentTarget);
      setSelectedItem(item);
    },
    []
  );

  useEffect(() => {
    if (!storageKey) return;

    const filters = JSON.parse(localStorage.getItem(storageKey) || "{}");
    setOrder(filters?.order?.toLowerCase?.() || "asc");
    setSortBy(filters?.sortBy || "");
  }, [storageKey]);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setSelectedItem(null);
  }, []);

  const handleEdit = useCallback(() => {
    if (selectedItem) {
      actions.handleEdit(pathname, selectedItem);
    }
    handleMenuClose();
  }, [actions, pathname, selectedItem, handleMenuClose]);

  const handleDelete = useCallback(() => {
    if (selectedItem) {
      actions.handleDelete(pathname, selectedItem);
    }
    handleMenuClose();
  }, [actions, pathname, selectedItem, handleMenuClose]);

  const handleRequestSort = useCallback(
    (property: string) => {
      const isAsc = sortBy === property && order === "asc";
      const newOrder = isAsc ? "desc" : "asc";
      const newSortBy = property;

      setOrder(newOrder);
      setSortBy(newSortBy);

      const thunkMap = {
        [ROUTES.USERS]: () => {
          const filters = updateFilters<GetFilters>("userFilters", {
            sortBy: newSortBy,
            order: newOrder.toUpperCase(),
          });
          return getAllUsersThunk(filters);
        },
        [ROUTES.INSTITUTIONS]: () => {
          const filters = updateFilters<GetFilters>("institutionFilters", {
            sortBy: newSortBy,
            order: newOrder.toUpperCase(),
          });
          return getAllInstitutionsThunk(filters);
        },
        [ROUTES.ROLES]: () => {
          const filters = updateFilters<GetFilters>("roleFilters", {
            sortBy: newSortBy,
            order: newOrder.toUpperCase(),
          });
          return getAllSecurityRolesThunk(filters);
        },
        [ROUTES.PERMISSIONS]: () => {
          const filters = updateFilters<GetFilters>("permissionFilters", {
            sortBy: newSortBy,
            order: newOrder.toUpperCase(),
          });
          return getAllSecurityPermissionsThunk(filters);
        },
        [ROUTES.RULES]: () => {
          const filters = updateFilters<GetFilters>("ruleFilters", {
            sortBy: newSortBy,
            order: newOrder.toUpperCase(),
          });
          return getAllExtractionRulesThunk(filters);
        },
      };

      const thunk = thunkMap[pathname];
      if (thunk) dispatch(thunk());
    },
    [dispatch, pathname, order, sortBy]
  );

  return {
    config,
    columns,
    searchTerm,
    pagination: config?.pagination,
    pathname,
    anchorEl,
    handleMenuClick,
    handleMenuClose,
    handleEdit,
    handleDelete,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    order,
    sortBy,
  };
};
