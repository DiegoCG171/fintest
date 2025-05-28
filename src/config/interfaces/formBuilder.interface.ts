
//Component's interface

import { FormTabItem } from ".";

/**Form Builder */
export interface FormBuilderProps {
    tabId: string;
    template?: FormTabItem
}

/**Form Row Builder */
export interface FormBuilderRowProps {
    row: TableRowDataFormBuilder;
    path: number[];
    tabId: string;
    headers: ColumnConfigFormBuilder[];
    isChild: boolean
}

/**Dynamic Field */
export interface DynamicFieldProps {
    column: ColumnConfigFormBuilder;
    value: string | number | boolean | undefined | unknown;
    row: TableRowDataFormBuilder;
    path: number[];
    tabId: string;
    isEditable: boolean
}

//Slice's interfaces

export interface FormBuilderState {
    config: ColumnConfigFormBuilder[];
    tabForms: {
        [tabId: string]: TabFormState;
    };
}

export interface ColumnConfigFormBuilder {
    id: string;
    label: string;
    width?: string;
    type: 'input' | 'select' | 'checkbox' | 'static' | 'dynamic';
    options?: string[];
    affects?: string[];
    dependsOn?: string;
    dynamicRender?: Record<string, { render: boolean; type?: 'input' | 'select'; options?: string[] }>;
    hide?: boolean;
}

export interface TableRowDataFormBuilder {
    idBitmap: string;
    displayName: string;
    isRequired?: boolean;
    isActive?: boolean;
    function?: string | undefined;
    value?: string | number | boolean;
    breakingRules?: TableRowDataFormBuilder[] | string;
    _id?: string;
    [key: string]: unknown | undefined;

}

export interface TabFormState {
    values: TableRowDataFormBuilder[];
    visibility: Record<string, boolean>;
}