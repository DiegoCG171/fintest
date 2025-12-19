import { Box } from "@mui/material";
import SeparatorMenu from "./SeparatorMenu";
import RecursiveMenuItem from "../../navigation/RecursiveMenuItem";
import { SidebarSectionProps } from "../../../config/interfaces";
import useFilterRecursive from "../../../config/hooks/sidebar/useFilterRecursive";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ItemsListSortable from "../../navigation/ItemsListSortable";

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
  overId,
}: SidebarSectionProps) {
  
  const filteredResources = useFilterRecursive(
    resource,
    searchTerm,
    !searchOnItem
  );

  const isFlat =
    filteredResources.length > 0 && 
    Boolean(filteredResources[0].linkMenu);

  return (
    <Box>
      <Box
        sx={{ px: 1, overflowY: "auto", flexGrow: 1, my: 4, marginRight: 1 }}
        key={"box-catalogo"}
      >
        <SeparatorMenu {...separatorMenuProps} />
        {renderSeparatorChildren && renderSeparatorChildren()}
        {isFlat ? (
          <ItemsListSortable
            items={filteredResources}
            optionsActive={optionsActive}
            onClick={onSelectItem}
            buildSubItemOptions={buildSubItemOptions}
            renderEditNodeEditor={renderChildrenEditNodeEditor}
            draggable={draggable}
          />
        ) : (
          <SortableContext
            items={filteredResources.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            {filteredResources.length > 0 ? (
              filteredResources.map((rootItem, index) => (
                <RecursiveMenuItem
                  key={`${index}-${rootItem.id}`}
                  item={rootItem}
                  optionsActive={optionsActive}
                  creatingChildId={creatingChildId}
                  onSelectItem={onSelectItem}
                  buildOptions={buildOptions}
                  buildSubItemOptions={buildSubItemOptions}
                  renderCreateChildEditor={renderCreateChildEditor}
                  renderEditNodeEditor={renderEditNodeEditor}
                  renderChildrenEditNodeEditor={renderChildrenEditNodeEditor}
                  draggable={draggable}
                  overId={overId}
                />
              ))
            ) : (
              <Box sx={{ px: 2, py: 1, fontSize: 14, color: "gray" }}>
                Sin resultados
              </Box>
            )}
          </SortableContext>
        )}
      </Box>
    </Box>
  );
}

export default SidebarSection;
