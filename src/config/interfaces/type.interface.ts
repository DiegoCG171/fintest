import { ReactNode } from "react";

export interface ThemeConfigProps {
    children: ReactNode;
}

export interface TableRowData {
    [key: string]: ReactNode;
}