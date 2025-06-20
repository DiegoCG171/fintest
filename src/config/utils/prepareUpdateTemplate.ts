import { FieldUpdateTemplate, PatchGenerationTemplate, TableRowDataFormBuilder } from "../interfaces";

export function prepareUpdatePayload(
    rows: TableRowDataFormBuilder[],
    typeForm: string
): PatchGenerationTemplate {
    const formattedRows: FieldUpdateTemplate[] = rows
    .filter(row => row.isActive)
    .map((row) => ({
        idBitmap: row.idBitmap ?? '',
        isRequired: Boolean(row.isRequired),
        function: row.function ?? '',
        value: row.value ?? '',
        fields: Array.isArray(row.breakingRules)
            ? row.breakingRules
            .filter(br => br.function)
            .map((br): FieldUpdateTemplate => ({
                idBitmap: br.idBitmap ?? '',
                isRequired: Boolean(br.isRequired),
                function: br.function ?? '',
                value: br.value ?? '',
                fields: Array.isArray(br.breakingRules)
                    ? br.breakingRules
                    .filter(f => f.function)
                    .map((f): FieldUpdateTemplate => ({
                        idBitmap: f.idBitmap ?? '',
                        function: f.function ?? '',
                        value: f.value ?? '',
                    }))
                    : undefined,
            }))
            : undefined,
    }));
    const result = {
        [typeForm]: formattedRows,
    }
    return result;
}