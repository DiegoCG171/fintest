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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { setUpdateUser } from "../../../store/slices/admin/admin.slice";
import { TagSettingTable } from "./TagSettingTable";
import { Institution, UserDB } from "../../../config/interfaces";
import {
  Permission,
  PermissionRol,
  Rol,
} from "../../../config/interfaces/security.interface";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

// Configuración tipada por ruta
type TableConfigMap = {
  "/settings/users": { columns: TableColumn<UserDB>[]; data: UserDB[] };
  "/settings/institutions": {
    columns: TableColumn<Institution>[];
    data: Institution[];
  };
  "/settings/roles": { columns: TableColumn<Rol>[]; data: Rol[] };
  "/settings/permissions": {
    columns: TableColumn<Permission>[];
    data: Permission[];
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
      data: institutions ?? [],
      columns: [
        { key: "name", label: "Nombre" },
        { key: "description", label: "Descripción" },
      ],
    },
    "/settings/roles": {
      data: roles ?? [],
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
      data: permissions ?? [],
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
                    margin: 8
                  },
                },
              }}
            >
              <List dense>
                {hidden.map((r) => (
                  <ListItem key={r.id}>
                    <ListItemText
                      primary={<TagSettingTable value={r.description.replace(/^Permiso para\s*/i, "")} />}
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
      dispatch(setUpdateUser(selectedItem));
    }
    handleClose();
  };

  const handleDelete = () => {
    console.log("Eliminar:", selectedItem);
    handleClose();
  };

  // Función para renderizar filas de manera type-safe
  const renderTableRows = () => {
    const pathname = location.pathname as CurrentRoute;

    if (pathname === "/settings/users") {
      const usersConfig = config as TableConfigMap["/settings/users"];
      return usersConfig.data.map((row, idx) => (
        <TableRow key={idx}>
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
        <TableRow key={idx}>
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
        <TableRow key={idx}>
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
        <TableRow key={idx}>
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
            <TableCell align="center" sx={{ fontWeight: "bold" }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {config.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={config.columns.length + 1} align="center">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            renderTableRows()
          )}
        </TableBody>
      </Table>

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
