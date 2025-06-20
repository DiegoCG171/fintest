import {
    FieldUpdateTemplate,
    PatchGenerationTemplate,
    TableRowDataFormBuilder,
} from "../interfaces";

function mapNestedRows(rows: TableRowDataFormBuilder[]): FieldUpdateTemplate[] {
    return rows
        .filter((row) => row.isRequired)
        .map((row) => ({
            idBitmap: row.idBitmap ?? '',
            isRequired: true,
            function: row.function ?? '',
            value: row.value ?? '',
            fields: Array.isArray(row.breakingRules)
            ? mapNestedRows(row.breakingRules as TableRowDataFormBuilder[])
            : [],
    }));
}

export function prepareUpdatePayload(
    rows: TableRowDataFormBuilder[],
    typeForm: string
    ): PatchGenerationTemplate {
    const formattedRows: FieldUpdateTemplate[] = rows
        .filter((row) => row.isActive)
        .map((row) => {
        let fields: FieldUpdateTemplate[] = [];
        if (row.idBitmap === "DE-63" && Array.isArray(row.breakingRules)) {
            fields = mapNestedRows(row.breakingRules as TableRowDataFormBuilder[]);
        }

        return {
            idBitmap: row.idBitmap ?? '',
            isRequired: Boolean(row.isRequired),
            function: row.function ?? '',
            value: row.value ?? '',
            fields,
        };
        });

    return {
        [typeForm]: formattedRows,
    };
}
