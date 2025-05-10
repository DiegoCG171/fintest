import { SelectProps, TextFieldProps } from "@mui/material";
import { ReactNode } from "react";
import { Field } from "./rules.interface";
import { serviceConfig } from "../utils/serviceConfig";

//Default Props

export interface WithChildrenProps {
    children: ReactNode;
}

//Table props

export interface TableRowDataOld {
    [key: string]: ReactNode | TableRowDataOld[];
}
export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface BasicTableProps {
    initialRows: TableRowDataOld[];
    showPagination?: boolean;
}

export interface DynamicTableProps {
    fields: Field[];
}

export interface ComplexFormTableProps {
    data: TableRowDataOld[];
    columns: ColumnDynamicConfig[]
    parentpath: string
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

export interface FormValues {
    [rootKey: string]: Record<string, Record<string, unknown>>;
}  


export type FormRefHandle = {
    submitForm: () => void;
};

//Menu props

export interface MenuItem {
    title: string;
    iconMenu?: React.ReactNode;
    linkMenu?: string;
    onClickMenu?: () => void;
    subItems?: MenuItem[];
}

export interface RecursiveMenuItemProps {
    item: MenuItem;
    depth?: number;
}

//Tabs props
// Para tabs dinámicos de formularios
export interface FormTabItem {
    label: string;
    templateId: string;
    formType: string;
    ref?: React.Ref<FormRefHandle>;
  }
  
  // Para tabs que pintan JSX directamente
  export interface StaticTabItem {
    label: string;
    content: React.ReactNode;
  }
   

export interface TabTableComponentProps {
    tabs: StaticTabItem[];
    initialTabIndex?: number;
}

export interface TabTableFormComponentProps {
    tabs: FormTabItem[];
    initialTabIndex?: number;
}

export interface TabConfigInterface {
    [key: string]: Array<{
        label: string;
        content: ReactNode;
    }>;
}

export interface TabbedCardContainerProps {
    tabs: { label: string; content: ReactNode }[];
    eventTabs: { label: string; content: ReactNode }[];
    initialTabIndex: number;
}

//Form props
export type CustomCheckboxProps = {
    id?: string;
    label?: string;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    color?: 'primary' | 'secondary' | 'default';
    size?: 'small' | 'medium';
    required?: boolean;
    errorMessage?: string;
};

export type CustomTextFieldProps = TextFieldProps & {
    label?: string;
    id: string;
    error?: boolean;
    helperText?: React.ReactNode;
    endIconType?: "password" | "validation";
    isValid?: boolean;
    inputSize?: InputSize;
};

export type CustomSelectProps = SelectProps & {
    label?: string;
    defaultValue?: string;
    id: string;
    error?: boolean;
    helperText?: React.ReactNode;
    isValid?: boolean;
    inputSize?: "small" | "medium";
    options: OptionsSelect;
};

export interface OptionsSelect {
    [key: string]: string | number;
}

export type InputSize = "sm" | "default" | "lg";

export interface StyleObject {
    mb: number;
    fontSize: string;
    fontWeight: string;
};

export interface DynamicFieldPropsOld {
    name: string;
    label?: string;
    row?: TableRowDataOld;
    column?: ColumnDynamicConfig;
    id: string | number;
    parentPath: string;
    isVisible?: boolean;
}

//Toast props

export type ToastType = "success" | "error" | "warning" | "info";
export interface ToastState {
    open: boolean;
    message: string;
    type: ToastType;
}
export interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

// UI props
export interface HeaderComponentProps {
    alerts: number;
}
export interface TextBoxProps {
    title: string;
    welcomeText: string;
    description: React.ReactNode;
    align?: string
}

//Middelware or handlers

export type DataMiddlewareProps = {
    payload?: {
        [key: string]: string | boolean | null | number | undefined;
    };
    dataCase: string,
    templateId: string
    formType: string
}

export type dataServiceType = keyof typeof serviceConfig;

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

