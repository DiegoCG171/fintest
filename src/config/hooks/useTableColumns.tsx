
import { useMemo } from "react";
import { EntityType, RouteType, TableColumn } from "../interfaces/tableSettings.interface";
import { UserDB } from "../interfaces";
import { TagSettingTable } from "../../components/UI/Settings/TagSettingTable";
import { Permission, Rol } from "../interfaces/security.interface";
import { PermissionsCell } from "../../components/UI/Settings/PermissionsCell";

export const useTableColumns = (pathname: RouteType): TableColumn<EntityType>[] | null => {
  return useMemo(() => {
    switch (pathname) {
      case "/settings/users":
        return [
          { key: "username", label: "Usuario" },
          {
            key: "names",
            label: "Nombre",
            render: (row) => {
              const user = row as UserDB;
              return `${user.names} ${user.surnames}`;
            },
          },
          { key: "email", label: "Correo electrónico" },
          {
            key: "status",
            label: "Estado",
            render: (row) => {
              const user = row as UserDB;
              return <TagSettingTable value={user.status} />;
            },
          },
          {
            key: "roles",
            label: "Roles",
            render: (row) => {
              const user = row as UserDB;
              return user.roles?.map((r) => (
                <TagSettingTable key={r.id} value={r.name} /> 
              )) ?? "—";
            },
          },
        ] as TableColumn<EntityType>[];

      case "/settings/institutions":
        return [
          { key: "name", label: "Nombre" },
          { key: "description", label: "Descripción" },
        ] as TableColumn<EntityType>[];

      case "/settings/roles":
        return [
          { key: "name", label: "Nombre" },
          { key: "description", label: "Descripción" },
          {
            key: "permissions",
            label: "Permisos",
            render: (row) => {
              const role = row as Rol;
              return <PermissionsCell permissions={role.permissions ?? []} />;
            },
          },
        ] as TableColumn<EntityType>[];

      case "/settings/permissions":
        return [
          { key: "description", label: "Nombre" },
          {
            key: "action",
            label: "Acción",
            render: (row) => {
              const permission = row as Permission;
              return <TagSettingTable value={permission.action.description} />;
            },
          },
          {
            key: "resource",
            label: "Recurso",
            render: (row) => {
              const permission = row as Permission;
              return <TagSettingTable value={permission.resource.description} />;
            },
          },
        ] as TableColumn<EntityType>[];

      default:
        return null;
    }
  }, [pathname]);
};