const PROPS_TO_REMOVE = ["_id", "uuid", "__v", "createdAt", "updatedAt", "path", "id"];

export function cleanObject<T>(obj: T, level = 0): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => cleanObject(item, level)) as T;
  }

  if (obj !== null && typeof obj === "object") {
    const result: Record<string, unknown> = {};
    const hasIdBitmap = "idBitmap" in obj;

    for (const [key, rawValue] of Object.entries(obj)) {
      if (PROPS_TO_REMOVE.includes(key)) continue;

      const cleanedValue = cleanObject(rawValue, level + 1);

      if (key === "idBitmap") {
        const forced = typeof cleanedValue === "string" ? cleanedValue : String(cleanedValue ?? "");
        result[key] = forced;
      } else {
        result[key] = cleanedValue;
      }
    }

    // 👉 Solo agregar idBitmap en objetos anidados (nivel > 0)
    if (!hasIdBitmap && level > 0) {
      result["idBitmap"] = "";
    }

    return result as T;
  }

  return obj;
}
