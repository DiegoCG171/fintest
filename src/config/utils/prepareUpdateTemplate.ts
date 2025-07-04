import { Field2, FieldUpdateTemplate, GenerationTransaction, PatchGenerationTemplate, TableRowDataFormBuilder } from "../interfaces";

export function prepareUpdatePayload(
    rows: TableRowDataFormBuilder[],
    typeForm: string
): PatchGenerationTemplate {
    const formattedRows: GenerationTransaction[] = rows
    .filter(row => row.function)
    .map((row) => ({
        idBitmap: row.idBitmap,
        isRequired: Boolean(row.isRequired),
        function: row.function,
        value: row.value,
        fields: Array.isArray(row.breakingRules)
            ? row.breakingRules
            .filter(br => br.function)
            .map((br): FieldUpdateTemplate => ({
                idBitmap: br.idBitmap,
                isRequired: Boolean(br.isRequired),
                function: br.function,
                value: br.value,
                fields: Array.isArray(br.breakingRules)
                    ? br.breakingRules
                    .filter(f => f.function)
                    .map((f): Field2 => ({
                        idBitmap: f.idBitmap,
                        function: f.function ?? '',
                        value: f.value,
                    }))
                    : undefined,
            }))
            : undefined,
    }));

    return {
        [typeForm]: formattedRows,
    };
}