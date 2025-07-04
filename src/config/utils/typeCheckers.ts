import { TableRowData } from "../interfaces";


function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isTableRowDataWithFields(
  obj: unknown
): obj is { ID: number | string; fields: TableRowData[] } {
  if (!isObject(obj)) return false;
  if (!("ID" in obj) || !("fields" in obj)) return false;

  const fields = (obj as { fields: unknown }).fields;
  return Array.isArray(fields) && fields.every((item) => isObject(item));
}
