import {
  FieldUpdateTemplate,
  PatchGenerationTemplate,
  TableRowDataFormBuilder,
} from "../interfaces";

function mapAllChildren(
  rows: TableRowDataFormBuilder[],
  typeForm: string
): FieldUpdateTemplate[] {
  return rows
    .filter((row) => row.isActive)
    .map((row) => {
      const base = {
        idBitmap: row.idBitmap ?? "",
        ...(typeForm !== "generationTransaction" && {
          isRequired: Boolean(row.isRequired),
        }),
        function: row.function ?? "",
        value: row.value ?? "",
      };

      const children = Array.isArray(row.breakingRules)
        ? mapAllChildren(
            row.breakingRules as TableRowDataFormBuilder[],
            typeForm
          )
        : [];

      /* return children.length > 0
            ? { ...base, fields: children }
            : base; */

      return { ...base, fields: children };
    });
}

export function prepareUpdatePayload(
  rows: TableRowDataFormBuilder[],
  typeForm: string
): PatchGenerationTemplate {
  const formattedRows: FieldUpdateTemplate[] = rows
    .filter((row) => row.isActive)
    .map((row) => {
      if (typeForm === "selectionTransaction") {
        return {
          idBitmap: row.idBitmap ?? "",
          function: row.function ?? "",
          value: row.value ?? "",
        };
      }

      const base = {
        idBitmap: row.idBitmap ?? "",
        ...(typeForm !== "generationTransaction" && {
          isRequired: Boolean(row.isRequired),
        }),
        function: row.function ?? "",
        value: row.value ?? "",
      };

      const children = Array.isArray(row.breakingRules)
        ? mapAllChildren(
            row.breakingRules as TableRowDataFormBuilder[],
            typeForm
          )
        : [];

      return children.length > 0 ? { ...base, fields: children } : base;
    });

  return {
    [typeForm]: formattedRows,
  };
}
