import { ReactNode } from "react";

export interface DefaultConfigProps {
    children: ReactNode;
}

export interface TableRowData {
    [key: string]: ReactNode;
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface HeaderComponentProps {
    alerts: number;
}

export interface ItemListProps {
    title: string;
    icon: React.ReactNode;
    onClick?: () => void;
    link?: string;
}

export interface TabDataInterface {
    label: string;
    content: ReactNode;
}

export interface TabConfigInterface {
    [key: string]: TabDataInterface[];
}

export interface MenuItem {
    title: string;
    onClick: (() => void) | undefined;
    link: string | undefined;
    name: string;
    icon: React.ReactNode;
    subItems?: MenuItem[];
}

export interface MenuToggleProps {
    title: string;
    icon: React.ReactNode;
    index: string | number;
    items: MenuItem[];
}

export interface SubMenuToggleProps {
    title: string;
    icon: React.ReactNode;
    items: MenuItem[];
}

export interface BasicTableProps {
    initialRows: TableRowData[];
    showPagination?: boolean;
}

export interface TabItem {
    label: string;
    content: React.ReactNode;
}

export interface TabTableComponentProps {
    tabs?: TabItem[];
    initialTabIndex?: number;
}

export interface TextBoxProps {
    title: string;
    welcomeText: string;
    description: React.ReactNode;
    align?: string
}

export interface TabbedCardContainerProps {
    tabs: { label: string; content: ReactNode }[];
    eventTabs: { label: string; content: ReactNode }[];
    initialTabIndex: number;
}

export interface ToastState {
    open: boolean;
    message: string;
    type: "success" | "error" | "warning" | "info";
}

export interface ToastContextType {
    showToast: (message: string, type?: "success" | "error" | "warning" | "info") => void;
}