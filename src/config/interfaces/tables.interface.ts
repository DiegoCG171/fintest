import { ReactNode } from "react";
import { Field } from ".";

export interface TableRowData {
    ID?: number | string;
    error?: FieldError;
    [key: string]: ReactNode | TableRowData[] | FieldError;
}

export interface NestedTableProps {
    data: TableRowData[];
    customRenderers?: {
        [columnKey: string]: (
            value: string | number | null | undefined
        ) => React.ReactNode;
    };
    level?: number;
}

export interface CustomRenders {
    [columnKey: string]: (
        value: string | number | null | undefined
    ) => React.ReactNode;
}

export interface BasicTableProps {
    initialRows: TableRowData[];
    showPagination?: boolean;
    customRenderers?: CustomRenders;
    type?: 'detail' | 'errors' | 'events';
}

export interface DynamicTableProps {
    fields: Field[];
}

export interface ComplexFormTableProps {
    data: TableRowDataOld[];
    columns: ColumnDynamicConfig[];
    parentpath: string;
}

export interface DynamicRenderConfig {
    render: boolean;
    type?: "input" | "select" | "checkbox" | "static";
    options?: string[];
}

export interface ColumnDynamicConfig {
    id: string;
    label: string;
    width: number | string;
    type?: string;
    dependsOn?: string;
    affects?: string[];
    options?: string[];
    hide?: boolean;
    dynamicRender?: Record<string, DynamicRenderConfig>;
}

export interface PropsComplexFormSubTable {
    data: Record<string, TableRowDataOld>;
    columns: ColumnConfig[];
    parentPath: string;
}

export interface ColumnConfig {
    id: string;
    label: string;
    width: string | number;
}

export interface FieldError {
    code: string;
    data: {
        length: number;
        regex: string;
        validation: string;
    };
}
export interface TableRowDataOld {
    [key: string]: ReactNode | TableRowDataOld[];
}