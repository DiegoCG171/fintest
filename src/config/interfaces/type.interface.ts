import { SelectProps, TextFieldProps } from "@mui/material";
import { ReactNode } from "react";
import { FieldRules } from "./rules.interface";
import { serviceConfig } from "../utils/serviceConfig";

//Default Props

export interface WithChildrenProps {
    children: ReactNode;
}


//Table props

export interface TableRowData {
    [key: string]: ReactNode | TableRowData[];
}
export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface BasicTableProps {
    initialRows: TableRowData[];
    showPagination?: boolean;
}

export interface DynamicTableProps {
    fields: FieldRules[];
}

export interface ComplexFormTableProps {
    data: TableRowData[];
    columns: { id: string; label: string; width: number; }[]
}

export interface PropsComplexFormSubTable {
    data: TableRowData[];
    columns: { id: string; label: string; width: number; }[]
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
export interface TabItem {
    label: string;
    content: ReactNode;
}

export interface TabTableComponentProps {
    tabs: TabItem[];
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

export interface DynamicFieldProps {
    name: string;
    type: "text" | "select" | "checkbox";
    label?: string;
    options?: { value: string; label: string }[]; 
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
    dataCase: dataServiceType,
}

export type dataServiceType = keyof typeof serviceConfig;


