export interface Roles {
  data: Rol[];
  totalSearch: number;
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface Permissions {
  data: Permission[];
  menuOptions: Permission[];
  totalSearch: number;
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface Actions {
  data: Action[];
  totalSearch: number;
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface Resources {
  data: Resource[];
  totalSearch: number;
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface Rol {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  permissions: PermissionRol[];
  permissionsIds?: number[];
}

export interface CreateSecurityRol {
  name: string;
  description: string;
  permissionsIds: number[];
}

export interface CreateSecurityPermission {
  description: string;
  actionId: number;
  resourceId: number;
}

export interface PermissionRol {
  id: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface Permission {
  id: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  action: Action;
  resource: Resource;
}

export interface Action {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface Resource {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}
