// DynamicSettingTable.tsx
import { useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Stack,
  List,
  ListItem,
  ListItemText,
  TablePagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import {
  setUpdateInstitution,
  setUpdatePermission,
  setUpdateRol,
  setUpdateUser,
} from "../../../store/slices/admin/admin.slice";
import { TagSettingTable } from "./TagSettingTable";
import { Institution, UserDB } from "../../../config/interfaces";
import {
  Permission,
  PermissionRol,
  Rol,
} from "../../../config/interfaces/security.interface";
import { openConfirmDeleteModal } from "../../../store/slices/UI/confirmDeleteModal/confirmDeleteModal.slice";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

// Interface para datos de paginación de Redux
interface PaginationData {
  total: number; // totalResults
  totalAll: number; // total sin filtros
  limit: number; // tamaño de página
  page: number; // página actual
  pages: number; // total de páginas
  order: string;
}

// Configuración tipada por ruta
type TableConfigMap = {
  "/settings/users": {
    columns: TableColumn<UserDB>[];
    data: UserDB[];
    pagination: PaginationData;
  };
  "/settings/institutions": {
    columns: TableColumn<Institution>[];
    data: Institution[];
    pagination: PaginationData;
  };
  "/settings/roles": {
    columns: TableColumn<Rol>[];
    data: Rol[];
    pagination: PaginationData;
  };
  "/settings/permissions": {
    columns: TableColumn<Permission>[];
    data: Permission[];
    pagination: PaginationData;
  };
};

// Hook que retorna los datos según ruta
const useTableData = (): TableConfigMap => {
  const { users, institutions, roles, permissions } = useAppSelector(
    (state) => state.admin
  );

  return {
    "/settings/users": {
      data: users?.data ?? [],
      pagination: {
        total: users?.totalResults ?? 0,
        totalAll: users?.totalAll ?? 0,
        limit: users?.limit ?? 10,
        page: users?.page ?? 1,
        pages: users?.pages ?? 1,
        order: users?.order ?? "ASC",
      },
      columns: [
        { key: "username", label: "Usuario" },
        {
          key: "names",
          label: "Nombre",
          render: (row) => `${row.names} ${row.surnames}`,
        },
        { key: "email", label: "Correo electrónico" },
        {
          key: "status",
          label: "Estado",
          render: (row) => <TagSettingTable value={row.status} />,
        },
        {
          key: "roles",
          label: "Roles",
          render: (row) =>
            row.roles?.map((r) => (
              <TagSettingTable key={r.id} value={r.name} />
            )) ?? "—",
        },
      ],
    },
    "/settings/institutions": {
      data: institutions?.data ?? [],
      pagination: {
        total: institutions?.totalResults ?? 0,
        totalAll: institutions?.totalAll ?? 0,
        limit: institutions?.limit ?? 10,
        page: institutions?.page ?? 1,
        pages: institutions?.pages ?? 1,
        order: institutions?.order ?? "ASC",
      },
      columns: [
        { key: "name", label: "Nombre" },
        { key: "description", label: "Descripción" },
      ],
    },
    "/settings/roles": {
      data: roles?.data ?? [],
      pagination: {
        total: roles?.totalResults ?? 0,
        totalAll: roles?.totalAll ?? 0,
        limit: roles?.limit ?? 10,
        page: roles?.page ?? 1,
        pages: roles?.pages ?? 1,
        order: roles?.order ?? "ASC",
      },
      columns: [
        { key: "name", label: "Nombre" },
        { key: "description", label: "Descripción" },
        {
          key: "permissions",
          label: "Permisos",
          render: (row) => (
            <PermissionsCell permissions={row.permissions ?? []} />
          ),
        },
      ],
    },
    "/settings/permissions": {
      data: permissions?.data ?? [],
      pagination: {
        total: permissions?.totalResults ?? 0,
        totalAll: permissions?.totalAll ?? 0,
        limit: permissions?.limit ?? 10,
        page: permissions?.page ?? 1,
        pages: permissions?.pages ?? 1,
        order: permissions?.order ?? "ASC",
      },
      columns: [
        { key: "description", label: "Nombre" },
        {
          key: "action",
          label: "Acción",
          render: (row) => <TagSettingTable value={row.action.name} />,
        },
        {
          key: "resource",
          label: "Recurso",
          render: (row) => <TagSettingTable value={row.resource.name} />,
        },
      ],
    },
  };
};

interface PermissionsCellProps {
  permissions: PermissionRol[];
}

export const PermissionsCell = ({ permissions }: PermissionsCellProps) => {
  const maxVisible = 2;
  const visible = permissions.slice(0, maxVisible);
  const hidden = permissions.slice(maxVisible);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Stack direction="row" spacing={0.5} flexWrap="wrap">
        {visible.map((r) => (
          <TagSettingTable
            key={r.id}
            value={r.description.replace(/^Permiso para\s*/i, "")}
          />
        ))}

        {hidden.length > 0 && (
          <>
            <TagSettingTable
              value={`+${hidden.length}`}
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            />
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: 300,
                    overflowY: "auto",
                    padding: 8,
                    margin: 8,
                  },
                },
              }}
            >
              <List dense>
                {hidden.map((r) => (
                  <ListItem key={r.id}>
                    <ListItemText
                      primary={
                        <TagSettingTable
                          value={r.description.replace(/^Permiso para\s*/i, "")}
                        />
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Popover>
          </>
        )}
      </Stack>
    </>
  );
};

// Función helper para renderizar una celda de manera type-safe
const renderCell = <T,>(column: TableColumn<T>, row: T): React.ReactNode => {
  if (column.render) {
    return column.render(row);
  }

  const value = row[column.key];
  return value !== null && value !== undefined ? String(value) : "—";
};

// Función helper para determinar si un item es UserDB
const isUserDB = (
  item: UserDB | Institution | Rol | Permission
): item is UserDB => {
  return "username" in item;
};

export const DynamicSettingTable = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const tableData = useTableData();

  type CurrentRoute = keyof TableConfigMap;
  const config = tableData[location.pathname as CurrentRoute];

  type RowType = UserDB | Institution | Rol | Permission;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<RowType | null>(null);
  const open = Boolean(anchorEl);

  if (!config) return <p>No table config for this route</p>;

  const { pagination } = config;

  // Función para manejar cambio de página
  const handleChangePage = (event: unknown, newPage: number) => {
    const newOffset = newPage * pagination.limit;
    console.log(newOffset);

    // Aquí debes disparar la acción de Redux para cargar la nueva página
    // Ejemplo (ajusta según tus actions):
    if (location.pathname === "/settings/users") {
      // dispatch(fetchUsers({ limit: pagination.limit, offset: newOffset }));
    }
    if (location.pathname === "/settings/institutions") {
      // dispatch(fetchInstitutions({ limit: pagination.limit, offset: newOffset }));
    }
    if (location.pathname === "/settings/roles") {
      // dispatch(fetchRoles({ limit: pagination.limit, offset: newOffset }));
    }
    if (location.pathname === "/settings/permissions") {
      // dispatch(fetchPermissions({ limit: pagination.limit, offset: newOffset }));
    }
  };

  // Función para manejar cambio en filas por página
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = +event.target.value;
    console.log(newLimit);
    // Aquí debes disparar la acción de Redux para cargar con el nuevo limit
    // Ejemplo (ajusta según tus actions):
    if (location.pathname === "/settings/users") {
      // dispatch(fetchUsers({ limit: newLimit, offset: 0 }));
    }
    if (location.pathname === "/settings/institutions") {
      // dispatch(fetchInstitutions({ limit: newLimit, offset: 0 }));
    }
    if (location.pathname === "/settings/roles") {
      // dispatch(fetchRoles({ limit: newLimit, offset: 0 }));
    }
    if (location.pathname === "/settings/permissions") {
      // dispatch(fetchPermissions({ limit: newLimit, offset: 0 }));
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: RowType
  ) => {
    setAnchorEl(e.currentTarget);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleEdit = () => {
    if (
      location.pathname === "/settings/users" &&
      selectedItem &&
      isUserDB(selectedItem)
    ) {
      dispatch(setUpdateUser({ type: "update", user: selectedItem }));
    }

    if (location.pathname === "/settings/institutions" && selectedItem) {
      dispatch(
        setUpdateInstitution({
          type: "update",
          institution: selectedItem as Institution,
        })
      );
    }

    if (location.pathname === "/settings/roles") {
      dispatch(setUpdateRol({ type: "update", role: selectedItem as Rol }));
    }

    if (location.pathname === "/settings/permissions") {
      dispatch(
        setUpdatePermission({
          type: "update",
          permission: selectedItem as Permission,
        })
      );
    }
    handleClose();
  };

  const handleDelete = () => {
    if (
      location.pathname === "/settings/users" &&
      selectedItem &&
      isUserDB(selectedItem)
    ) {
      dispatch(
        openConfirmDeleteModal({ id: selectedItem.id, resource: "user" })
      );
    }

    if (location.pathname === "/settings/institutions") {
      dispatch(
        openConfirmDeleteModal({
          id: selectedItem?.id as string,
          resource: "institution",
        })
      );
    }

    if (location.pathname === "/settings/roles") {
      dispatch(
        openConfirmDeleteModal({
          id: selectedItem?.id as string,
          resource: "rol",
        })
      );
    }

    if (location.pathname === "/settings/permissions") {
      dispatch(
        openConfirmDeleteModal({
          id: selectedItem?.id as string,
          resource: "permission",
        })
      );
    }
    handleClose();
  };

  // Función para renderizar filas de manera type-safe
  const renderTableRows = () => {
    const pathname = location.pathname as CurrentRoute;

    if (pathname === "/settings/users") {
      const usersConfig = config as TableConfigMap["/settings/users"];
      return usersConfig.data.map((row, idx) => (
        <TableRow key={row.id || idx}>
          {usersConfig.columns.map((col) => (
            <TableCell key={col.key as string}>
              {renderCell(col, row)}
            </TableCell>
          ))}
          <TableCell align="center">
            <IconButton onClick={(e) => handleClick(e, row)}>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ));
    }

    if (pathname === "/settings/institutions") {
      const institutionsConfig =
        config as TableConfigMap["/settings/institutions"];
      return institutionsConfig.data.map((row, idx) => (
        <TableRow key={row.id || idx}>
          {institutionsConfig.columns.map((col) => (
            <TableCell key={col.key as string}>
              {renderCell(col, row)}
            </TableCell>
          ))}
          <TableCell align="center">
            <IconButton onClick={(e) => handleClick(e, row)}>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ));
    }

    if (pathname === "/settings/roles") {
      const rolesConfig = config as TableConfigMap["/settings/roles"];
      return rolesConfig.data.map((row, idx) => (
        <TableRow key={row.id || idx}>
          {rolesConfig.columns.map((col) => (
            <TableCell key={col.key as string}>
              {renderCell(col, row)}
            </TableCell>
          ))}
          <TableCell align="center">
            <IconButton onClick={(e) => handleClick(e, row)}>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ));
    }

    if (pathname === "/settings/permissions") {
      const permissionsConfig =
        config as TableConfigMap["/settings/permissions"];
      return permissionsConfig.data.map((row, idx) => (
        <TableRow key={row.id || idx}>
          {permissionsConfig.columns.map((col) => (
            <TableCell key={col.key as string}>
              {renderCell(col, row)}
            </TableCell>
          ))}
          <TableCell align="center">
            <IconButton onClick={(e) => handleClick(e, row)}>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ));
    }

    return null;
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f6f6f6" }}>
            {config.columns.map((col) => (
              <TableCell key={col.key as string} sx={{ fontWeight: "bold" }}>
                {col.label}
              </TableCell>
            ))}
            <TableCell align="center" sx={{ fontWeight: "bold" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {config.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={config.columns.length + 1} align="center">
                Sin datos
              </TableCell>
            </TableRow>
          ) : (
            renderTableRows()
          )}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.limit}
        page={pagination.page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
        sx={{
          borderTop: "1px solid #e0e0e0",
          "& .MuiTablePagination-toolbar": {
            paddingLeft: 2,
            paddingRight: 2,
          },
        }}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ "& .MuiMenuItem-root": { fontSize: 12, minHeight: 24 } }}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
      </Menu>
    </TableContainer>
  );
};
