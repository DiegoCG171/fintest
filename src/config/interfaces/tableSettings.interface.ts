import { Permission, Rol } from "./security.interface";
import { Institution, UserDB } from "./users.interface";


export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface PaginationData {
  total: number;
  totalAll: number;
  limit: number;
  page: number;
  pages: number;
}

export type EntityType = UserDB | Institution | Rol | Permission;
export type RouteType = "/settings/users" | "/settings/institutions" | "/settings/roles" | "/settings/permissions";

export interface TableConfig<T extends EntityType> {
  columns: TableColumn<T>[];
  data: T[];
  pagination: PaginationData;
}