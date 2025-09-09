import { Box } from "@mui/material";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import RecursiveMenuSubItem from "./RecursiveMenuSubItem";
import { useMemo } from "react";
import { ItemsListSortableProps } from "../../config/interfaces";

export default function ItemsListSortable({
    items,
    optionsActive,
    onClick,
    buildSubItemOptions,
    renderEditNodeEditor,
    draggable = false,
    }: ItemsListSortableProps) {
    const ids = useMemo(() => items.map((i) => i.id), [items]);

    return (
        <Box sx={{ pl: 1, maxWidth: "250px", overflow: "hidden" }}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {items.map((subItem) => (
            <RecursiveMenuSubItem
                key={`box-${subItem.id}`}
                item={subItem}
                optionsActive={optionsActive}
                onClick={onClick}
                buildOptions={buildSubItemOptions}
                renderEditNodeEditor={renderEditNodeEditor}
                draggable={draggable}
            />
            ))}
        </SortableContext>
        </Box>
    );
}
