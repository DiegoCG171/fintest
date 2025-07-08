
//Tabs props
import { ReactNode } from "react";
import { originType } from ".";

// Para tabs dinámicos de formularios
export interface FormTabItem {
    label: string;
    templateId: string;
    formType: string;
    canEdit: boolean;
    origin: originType;
}

// Para tabs que pintan JSX directamente
export interface StaticTabItem {
    label: string;
    content: React.ReactNode;
    route?: string
    canEdit: boolean
    origin?: originType;
}

export interface TabTableComponentProps {
    tabs: StaticTabItem[];
    initialTabIndex?: number;
}

export interface TabTableFormComponentProps {
    tabs: FormTabItem[];
    initialTabIndex?: number;
}

export interface CatalogsDataMiddlewareProps {
    tabId: string;
    template: FormTabItem;
}

export interface TabConfigInterface {
    [key: string]: Array<{
        label: string;
        content: ReactNode;
        canEdit: boolean;
        origin: originType;
    }>;
}

export interface TabbedCardContainerProps {
    tabs: { label: string; content: ReactNode, canEdit: boolean }[];
    eventTabs: { label: string; content: ReactNode, canEdit: boolean }[];
    initialTabIndex: number | undefined;
}

/**Form Builder */
export interface FormBuilderProps {
    tabId: string;
    template?: FormTabItem;
    canEdit: boolean
}

/**Form Row Builder */
export interface FormBuilderRowProps {
    row: TableRowDataFormBuilder;
    path: number[];
    tabId: string;
    headers: ColumnConfigFormBuilder[];
    isChild: boolean
    canEdit: boolean
}

/**Dynamic Field */
export interface DynamicFieldProps {
    column: ColumnConfigFormBuilder;
    value: string | number | boolean | undefined | unknown;
    row: TableRowDataFormBuilder;
    path: number[];
    tabId: string;
    isEditable: boolean
    onlyRead: boolean
}

//Slice's interfaces

export interface FormBuilderState {
    tabForms: {
        [tabId: string]: {
            values: TableRowDataFormBuilder[];
            originalValues: TableRowDataFormBuilder[];
            visibility?: Record<string, boolean>;
        };
    };
    config: ColumnConfigFormBuilder[];
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
    isRequired: boolean;
    isActive?: boolean;
    function?: string | undefined;
    value: string | number | boolean | null | undefined;
    breakingRules?: TableRowDataFormBuilder[] | string;
    _id?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface TabFormState {
    values: TableRowDataFormBuilder[];
    visibility: Record<string, boolean>;
}