import { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useTableData } from "./useTableData";
import { useAppSelector } from "../../store";
import { usePaginationHandlers } from "./usePaginationHandlers";
import { useTableActions } from "./useTableActions";
import { EntityType, RouteType } from "../interfaces/tableSettings.interface";
import { useTableColumns } from "./useTableColumns";

export const useDynamicTable = () => {
  const location = useLocation();
  const tableData = useTableData();
  const { searchTerm } = useAppSelector((state) => state.admin);
  const { handleChangePage, handleChangeRowsPerPage } = usePaginationHandlers();
  const actions = useTableActions();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<EntityType | null>(null);

  const pathname = location.pathname as RouteType;
  const config = tableData[pathname];
  const columns = useTableColumns(pathname);

  const handleMenuClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, item: EntityType) => {
      setAnchorEl(e.currentTarget);
      setSelectedItem(item);
    },
    []
  );

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
  };
};
