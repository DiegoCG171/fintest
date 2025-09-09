import { Box } from "@mui/material";
import SeparatorMenu from "./SeparatorMenu";
import RecursiveMenuItem from "../../navigation/RecursiveMenuItem";
import { SidebarSectionProps } from "../../../config/interfaces";
import useFilterRecursive from "../../../config/hooks/sidebar/useFilterRecursive";

function SidebarSection({
    separatorMenuProps,
    searchTerm,
    searchOnItem,
    resource,
    optionsActive,
    draggable = false,
    creatingChildId,
    onSelectItem,
    buildOptions,
    buildSubItemOptions,
    renderCreateChildEditor,
    renderEditNodeEditor,
    renderChildrenEditNodeEditor,
    renderSeparatorChildren,
    overId
    }: SidebarSectionProps) {
    const filteredResourses = useFilterRecursive(
        resource,
        searchTerm,
        !searchOnItem
    );
    return (
        <Box>
        <Box
            sx={{ px: 1, overflowY: "auto", flexGrow: 1, my: 4, marginRight: 1 }}
            key={"box-catalogo"}
        >
            <SeparatorMenu {...separatorMenuProps} />
            {renderSeparatorChildren && renderSeparatorChildren()}
            {filteredResourses.length > 0 ? (
            filteredResourses.map((rootItem, index) => (
                <RecursiveMenuItem
                key={`${index}-${rootItem.id}`}
                item={rootItem}
                {...{
                    optionsActive,
                    creatingChildId,
                    onSelectItem,
                    buildOptions,
                    buildSubItemOptions,
                    renderCreateChildEditor,
                    renderEditNodeEditor,
                    renderChildrenEditNodeEditor,
                    draggable,
                    overId
                }}
                />
            ))
            ) : (
            <Box sx={{ px: 2, py: 1, fontSize: 14, color: "gray" }}>
                Sin resultados
            </Box>
            )}
        </Box>
        </Box>
    );
}
export default SidebarSection;
