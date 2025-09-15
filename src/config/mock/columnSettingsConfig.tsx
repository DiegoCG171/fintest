import { PermissionsCell } from "../../components/UI/Settings/PermissionsCell";
import { TagSettingTable } from "../../components/UI/Settings/TagSettingTable";
import { Institution, UserDB } from "../interfaces";
import { Permission, Rol } from "../interfaces/security.interface";
import { TableColumn } from "../interfaces/tableSettings.interface";

export const columnsSettingsConfig = {
  "/settings/users": [
    { key: "username", label: "Usuario" },
    {
      key: "names",
      label: "Nombre",
      render: (row: UserDB) => `${row.names} ${row.surnames}`,
    },
    { key: "email", label: "Correo electrónico" },
    {
      key: "status",
      label: "Estado",
      render: (row: UserDB) => <TagSettingTable value={row.status} />,
    },
    {
      key: "roles",
      label: "Roles",
      render: (row: UserDB) =>
        row.roles?.map((r) => <TagSettingTable key={r.id} value={r.name} />) ??
        "—",
    },
  ] as TableColumn<UserDB>[],
  "/settings/institutions": [
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
  ] as TableColumn<Institution>[],
  "/settings/roles": [
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
    {
      key: "permissions",
      label: "Permisos",
      render: (row: Rol) => (
        <PermissionsCell permissions={row.permissions ?? []} />
      ),
    },
  ] as TableColumn<Rol>[],
  "/settings/permissions": [
    { key: "description", label: "Nombre" },
    {
      key: "action",
      label: "Acción",
      render: (row: Permission) => (
        <TagSettingTable value={row.action.description} />
      ),
    },
    {
      key: "resource",
      label: "Recurso",
      render: (row: Permission) => (
        <TagSettingTable value={row.resource.description} />
      ),
    },
  ] as TableColumn<Permission>[],
};

