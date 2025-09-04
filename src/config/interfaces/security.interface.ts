export interface Roles {
  data: Rol[];
  totalResults: number;
  totalAll: number;
  limit: number;
  page: number;
  pages: number;
  order: string;
}

export interface Permissions {
  data: Permission[];
  totalResults: number;
  totalAll: number;
  limit: number;
  page: number;
  pages: number;
  order: string;
}

export interface Actions {
  data: Action[];
  totalResults: number;
  totalAll: number;
  limit: number;
  page: number;
  pages: number;
  order: string;
}

export interface Resources {
  data: Resource[];
  totalResults: number;
  totalAll: number;
  limit: number;
  page: number;
  pages: number;
  order: string;
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
