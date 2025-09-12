import { FormConfig } from "../interfaces/formSettings.interface";


export const formConfigs: Record<string, FormConfig> = {
  "/settings/users": {
    title: "Editar usuario",
    description: "Completa los campos para actualizar la información del usuario.",
    confirmText: "Actualizar usuario",
    storeKey: "updateUser",
    fields: [
      { type: "text", name: "names", label: "Nombre", validation: {required: false} },
      { type: "text", name: "surnames", label: "Apellidos", validation: {required: false} },
      { type: "text", name: "username", label: "Nombre de usuario", validation: {required: false} },
      { type: "text", name: "email", label: "Correo electrónico", validation: {required: false} },
      { type: "institutionSelect", name: "institutionId", label: "Institución", validation: {required: false} },
      { type: "roleSelect", name: "roleIds", label: "Rol", validation: {required: false} },
      {
        type: "select",
        name: "status",
        label: "Estado",
        options: [
          { value: "active", label: "Activo" },
          { value: "deactive", label: "Inactivo" },
        ],
        validation: {required: false}
      },
      { type: "password", name: "password", label: "Generar nueva contraseña", validation: {required: false} },
    ],
  },
  "/settings/institutions": {
    title: "Editar institución",
    description: "Completa los campos para actualizar la información de la institución.",
    confirmText: "Actualizar institución",
    storeKey: "updateInstitution",
    fields: [
      { type: "text", name: "name", label: "Nombre de la institución", validation: {required: false} },
      { type: "text", name: "description", label: "Descripción", validation: {required: false} },
    ],
  },
  "/settings/roles": {
    title: "Editar rol",
    description: "Completa los campos para actualizar la información del rol.",
    confirmText: "Actualizar rol",
    storeKey: "updateRol",
    fields: [
      { type: "text", name: "name", label: "Nombre del rol", validation: {required: false} },
      { type: "text", name: "description", label: "Descripción", validation: {required: false} },
      { type: "permissionSelect", name: "permissionId", label: "Permisos", validation: {required: false} },
    ],
  },
  "/settings/permissions": {
    title: "Editar permiso",
    description: "Completa los campos para actualizar la información del permiso.",
    confirmText: "Actualizar permiso",
    storeKey: "updatePermission",
    fields: [
      { type: "text", name: "description", label: "Descripción", validation: {required: false} },
      { type: "actionSelect", name: "action", label: "Acción", validation: {required: false} },
      { type: "resourceSelect", name: "resource", label: "Recurso", validation: {required: false} },
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
      { type: "text", name: "names", label: "Nombre", validation: {required: true}},
      { type: "text", name: "surnames", label: "Apellidos", validation: {required: true} },
      { type: "text", name: "username", label: "Nombre de usuario", validation: {required: true} },
      { type: "text", name: "email", label: "Correo electrónico", validation: {required: true, email: true} },
      { type: "institutionSelect", name: "institutionId", label: "Institución", validation: {required: false} },
      { type: "roleSelect", name: "roleIds", label: "Rol", validation: {required: false} },
      { type: "password", name: "password", label: "Contraseña", validation: {required: false} },
    ],
  },
  "/settings/institutions": {
    title: "Crear institución",
    description: "Completa los campos para crear una nueva institución.",
    confirmText: "Crear institución",
    storeKey: "createInstitution",
    fields: [
      { type: "text", name: "name", label: "Nombre de la institución", validation: {required: true} },
      { type: "text", name: "description", label: "Descripción", validation: {required: true} },
    ],
  },
  "/settings/roles": {
    title: "Crear rol",
    description: "Completa los campos para crear un nuevo rol.",
    confirmText: "Crear rol",
    storeKey: "createRol",
    fields: [
      { type: "text", name: "name", label: "Nombre del rol", validation: {required: true}},
      { type: "text", name: "description", label: "Descripción", validation: {required: true} },
      { type: "permissionSelect", name: "permissionId", label: "Permisos", validation: {required: true} },
    ],
  },
  "/settings/permissions": {
    title: "Crear permiso",
    description: "Completa los campos para crear un nuevo permiso.",
    confirmText: "Crear permiso",
    storeKey: "createPermission",
    fields: [
      { type: "text", name: "description", label: "Descripción", validation: {required: true} },
      { type: "actionSelect", name: "action", label: "Acción", validation: {required: true} },
      { type: "resourceSelect", name: "resource", label: "Recurso", validation: {required: true} },
    ],
  },
};