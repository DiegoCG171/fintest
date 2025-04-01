import { ReactNode } from "react";

export interface DefaultConfigProps {
    children: ReactNode;
}

export interface TableRowData {
    [key: string]: ReactNode;
}