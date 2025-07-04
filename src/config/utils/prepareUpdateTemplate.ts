import {
    FieldUpdateTemplate,
    PatchGenerationTemplate,
    TableRowDataFormBuilder,
} from "../interfaces";


function mapAllChildren(rows: TableRowDataFormBuilder[]): FieldUpdateTemplate[] {
    return rows.map((row) => ({
        idBitmap: row.idBitmap ?? '',
        isRequired: Boolean(row.isRequired),
        function: row.function ?? '',
        value: row.value ?? '',
        fields: Array.isArray(row.breakingRules)
        ? mapAllChildren(row.breakingRules as TableRowDataFormBuilder[])
        : [],
    }));
}

function mapOnlyRequiredChildren(rows: TableRowDataFormBuilder[]): FieldUpdateTemplate[] {
    return rows
        .filter((row) => row.isRequired)
        .map((row) => ({
        idBitmap: row.idBitmap ?? '',
        isRequired: row.isRequired,
        function: row.function ?? '',
        value: row.value ?? '',
        fields: Array.isArray(row.breakingRules)
            ? mapAllChildren(row.breakingRules as TableRowDataFormBuilder[])
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

        if (Array.isArray(row.breakingRules)) {
            fields = row.idBitmap === "DE-63"
            ? mapOnlyRequiredChildren(row.breakingRules as TableRowDataFormBuilder[])
            : mapAllChildren(row.breakingRules as TableRowDataFormBuilder[]);
        }
        
        if (typeForm === 'selectionTransaction') {
            return {
                idBitmap: row.idBitmap ?? '',
                function: row.function ?? '',
                value: row.value ?? '',
            };
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
