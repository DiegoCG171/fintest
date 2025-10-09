// utils/table.utils.ts

import { RESOURCE_MAP } from "../constants/tableSettings";
import { Institution, UserDB } from "../interfaces";
import { Permission, Rol } from "../interfaces/security.interface";
import { EntityType, RouteType, TableColumn } from "../interfaces/tableSettings.interface";
import { HighlightText } from "./HighlightText";

export const getResourceFromPath = (pathname: string): string => {
  return RESOURCE_MAP[pathname as RouteType] || "";
};

export const isUserDB = (item: EntityType): item is UserDB => {
  return "username" in item;
};

export const isInstitution = (item: EntityType): item is Institution => {
  return "name" in item && "description" in item && !("username" in item);
};

export const isRol = (item: EntityType): item is Rol => {
  return "permissions" in item;
};

export const isPermission = (item: EntityType): item is Permission => {
  return "action" in item && "resource" in item;
};

export const isRule = (item: EntityType): item is Permission => {
  return "version" in item && "type" in item;
};

export const renderCell = <T,>(
  column: TableColumn<T>,
  row: T,
  searchTerm?: string
): React.ReactNode => {
  if (column.render) {
    return column.render(row);
  }

  const value = row[column.key as keyof T];
  if (value === null || value === undefined) return "—";

  return <HighlightText text={String(value)} query={searchTerm ?? ""} />;
};