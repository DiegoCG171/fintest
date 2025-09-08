import { FormConfig } from "../interfaces/formSettings.interface";


export const formConfigs: Record<string, FormConfig> = {
  "/settings/users": {
    title: "Editar usuario",
    description: "Completa los campos para actualizar la información del usuario.",
    confirmText: "Actualizar usuario",
    storeKey: "updateUser",
    fields: [
      { type: "text", name: "names", label: "Nombre" },
      { type: "text", name: "surnames", label: "Apellidos" },
      { type: "text", name: "username", label: "Nombre de usuario" },
      { type: "text", name: "email", label: "Correo electrónico" },
      { type: "institutionSelect", name: "institutionId", label: "Institución" },
      { type: "roleSelect", name: "roleId", label: "Rol" },
      {
        type: "select",
        name: "status",
        label: "Estado",
        options: [
          { value: "active", label: "Activo" },
          { value: "deactive", label: "Inactivo" },
        ],
      },
    ],
  },
  "/settings/institutions": {
    title: "Editar institución",
    description: "Completa los campos para actualizar la información de la institución.",
    confirmText: "Actualizar institución",
    storeKey: "updateInstitution",
    fields: [
      { type: "text", name: "name", label: "Nombre de la institución" },
      { type: "text", name: "description", label: "Descripción" },
    ],
  },
  "/settings/roles": {
    title: "Editar rol",
    description: "Completa los campos para actualizar la información del rol.",
    confirmText: "Actualizar rol",
    storeKey: "updateRol",
    fields: [
      { type: "text", name: "name", label: "Nombre del rol" },
      { type: "text", name: "description", label: "Descripción" },
      { type: "permissionSelect", name: "permissionId", label: "Permisos" },
    ],
  },
  "/settings/permissions": {
    title: "Editar permiso",
    description: "Completa los campos para actualizar la información del permiso.",
    confirmText: "Actualizar permiso",
    storeKey: "updatePermission",
    fields: [
      { type: "text", name: "description", label: "Descripción" },
      { type: "actionSelect", name: "action", label: "Acción" },
      { type: "resourceSelect", name: "resource", label: "Recurso" },
    ],
  },
};

export const formConfigsCreate: Record<string, FormConfig> = {
  "/settings/users": {
    title: "Crear usuario",
    description: "Completa los campos para crear un nuevo usuario.",
    confirmText: "Crear usuario",
    storeKey: "createUser",
    fields: [
      { type: "text", name: "names", label: "Nombre" },
      { type: "text", name: "surnames", label: "Apellidos" },
      { type: "text", name: "username", label: "Nombre de usuario" },
      { type: "text", name: "email", label: "Correo electrónico" },
      { type: "password", name: "password", label: "Contraseña" },
      { type: "institutionSelect", name: "institutionId", label: "Institución" },
      { type: "roleSelect", name: "roleId", label: "Rol" },
    ],
  },
  "/settings/institutions": {
    title: "Crear institución",
    description: "Completa los campos para crear una nueva institución.",
    confirmText: "Crear institución",
    storeKey: "createInstitution",
    fields: [
      { type: "text", name: "name", label: "Nombre de la institución" },
      { type: "text", name: "description", label: "Descripción" },
    ],
  },
  "/settings/roles": {
    title: "Crear rol",
    description: "Completa los campos para crear un nuevo rol.",
    confirmText: "Crear rol",
    storeKey: "createRol",
    fields: [
      { type: "text", name: "name", label: "Nombre del rol" },
      { type: "text", name: "description", label: "Descripción" },
      { type: "permissionSelect", name: "permissionId", label: "Permisos" },
    ],
  },
  "/settings/permissions": {
    title: "Crear permiso",
    description: "Completa los campos para crear un nuevo permiso.",
    confirmText: "Crear permiso",
    storeKey: "createPermission",
    fields: [
      { type: "text", name: "description", label: "Descripción" },
      { type: "actionSelect", name: "action", label: "Acción" },
      { type: "resourceSelect", name: "resource", label: "Recurso" },
    ],
  },
};