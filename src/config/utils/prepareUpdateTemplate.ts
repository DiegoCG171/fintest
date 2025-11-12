import {
  FieldUpdateTemplate,
  PatchGenerationTemplate,
  TableRowDataFormBuilder,
} from "../interfaces";
import { getDefaultFunctionByFormType } from "./setTabFormFromTemplate";

function mapAllChildren(
  rows: TableRowDataFormBuilder[],
  typeForm: string
): FieldUpdateTemplate[] {
  const defaultFn = getDefaultFunctionByFormType(typeForm);
  return rows
    .filter((row) => row.isActive)
    .map((row) => {
      const base = {
        idBitmap: row.idBitmap ?? "",
        ...(typeForm !== "generationTransaction" && {
          isRequired: Boolean(row.isRequired),
        }),
        function: !row.function?.trim() ? defaultFn : row.function,
        value: row.value ?? "",
      };
      const children = Array.isArray(row.breakingRules)
        ? mapAllChildren(
            row.breakingRules as TableRowDataFormBuilder[],
            typeForm
          )
        : [];

      return { ...base, fields: children };
    });
}

export function prepareUpdatePayload(
  rows: TableRowDataFormBuilder[],
  typeForm: string
): PatchGenerationTemplate {
  const defaultFn = getDefaultFunctionByFormType(typeForm);
  const formattedRows: FieldUpdateTemplate[] = rows
    .filter((row) => row.isActive)
    .map((row) => {
      const base = {
        idBitmap: row.idBitmap ?? "",
        ...(typeForm === "validationTransaction" && {
          isRequired: Boolean(row.isRequired),
        }),
        function: !row.function?.trim() ? defaultFn : row.function,
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
