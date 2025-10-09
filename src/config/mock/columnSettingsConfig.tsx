import { PermissionsCell } from "../../components/UI/Settings/PermissionsCell";
import { TagSettingTable } from "../../components/UI/Settings/TagSettingTable";
import { Institution, UserDB } from "../interfaces";
import { Permission, Rol } from "../interfaces/security.interface";
import { TableColumn } from "../interfaces/tableSettings.interface";

export const columnsSettingsConfig = {
  "/settings/users": [
    { key: "username", label: "Usuario", sortable: true },
    {
      key: "names",
      label: "Nombre",
      sortable: true,
      render: (row: UserDB) => `${row.names} ${row.surnames}`,
    },
    { key: "email", label: "Correo electrónico", sortable: true },
    {
      key: "status",
      label: "Estado",
      sortable: true,
      render: (row: UserDB) => <TagSettingTable value={row.status} />,
    },
    {
      key: "roles",
      label: "Roles",
      sortable: false,
      render: (row: UserDB) =>
        row.roles?.map((r) => <TagSettingTable key={r.id} value={r.name} />) ??
        "—",
    },
  ] as TableColumn<UserDB>[],
  "/settings/institutions": [
    { key: "name", label: "Nombre", sortable: true },
    { key: "description", label: "Descripción", sortable: true },
  ] as TableColumn<Institution>[],
  "/settings/roles": [
    { key: "name", label: "Nombre", sortable: true },
    { key: "description", label: "Descripción", sortable: true },
    {
      key: "permissions",
      label: "Permisos",
      sortable: false,
      render: (row: Rol) => (
        <PermissionsCell permissions={row.permissions ?? []} />
      ),
    },
  ] as TableColumn<Rol>[],
  "/settings/permissions": [
    { key: "description", label: "Nombre", sortable: true },
    {
      key: "action",
      label: "Acción",
      sortable: false,
      render: (row: Permission) => (
        <TagSettingTable value={row.action.description} />
      ),
    },
    {
      key: "resource",
      label: "Recurso",
      sortable: false,
      render: (row: Permission) => (
        <TagSettingTable value={row.resource.description} />
      ),
    },
  ] as TableColumn<Permission>[],
  "/settings/rule": [
    { key: "version", label: "Versión", sortable: true },
    { key: "type", label: "Tipo", sortable: true },
  ] as TableColumn<Permission>[],
};
