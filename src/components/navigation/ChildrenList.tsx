import { Box } from "@mui/material";
import { MenuServiceInterface } from "../../config/interfaces";
import { ReactNode } from "react";

interface ChildrenListProps {
    childrenNodes: MenuServiceInterface[];
    renderChild: (child: MenuServiceInterface) => ReactNode;
}

export default function ChildrenList({
    childrenNodes,
    renderChild,
    }: ChildrenListProps) {
    return <Box>{childrenNodes.map((child) => renderChild(child))}</Box>;
}
