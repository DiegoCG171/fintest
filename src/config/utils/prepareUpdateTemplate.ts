import {
    FieldUpdateTemplate,
    PatchGenerationTemplate,
    TableRowDataFormBuilder,
} from "../interfaces";

// Recursivo sin filtrar hijos
function mapNestedRows(rows: TableRowDataFormBuilder[]): FieldUpdateTemplate[] {
    return rows.map((row) => ({
        idBitmap: row.idBitmap ?? '',
        isRequired: Boolean(row.isRequired),
        function: row.function ?? '',
        value: row.value ?? '',
        fields: Array.isArray(row.breakingRules)
        ? mapNestedRows(row.breakingRules as TableRowDataFormBuilder[])
        : undefined,
    }));
}

export function prepareUpdatePayload(
    rows: TableRowDataFormBuilder[],
    typeForm: string
    ): PatchGenerationTemplate {
    const formattedRows: FieldUpdateTemplate[] = rows
        .filter((row) => row.isActive)
        .filter((row) => !(row.idBitmap === "DE-63" && !row.isRequired))
        .map((row) => ({
        idBitmap: row.idBitmap ?? '',
        isRequired: Boolean(row.isRequired),
        function: row.function ?? '',
        value: row.value ?? '',
        fields: Array.isArray(row.breakingRules)
            ? mapNestedRows(row.breakingRules as TableRowDataFormBuilder[])
            : undefined,
        }));

    return {
        [typeForm]: formattedRows,
    };
}
