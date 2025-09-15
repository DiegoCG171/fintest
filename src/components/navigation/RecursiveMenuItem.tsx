import { useEffect, useState, useCallback, useMemo } from "react";
import { ItemsServiceMenu, MenuServiceInterface, RecursiveMenuItemProps } from "../../config/interfaces";
import { useNavigate } from "react-router-dom";
import { setLoading, useAppDispatch } from "../../store";
import NodeContainer from "./NodeContainer";
import FolderHeaderDroppable from "./FolderHeaderDroppable";
import InlineCreateChildEditor from "./InlineCreateChildEditor";
import ChildrenList from "./ChildrenList";
import ItemsListSortable from "./ItemsListSortable";

export default function RecursiveMenuItem({
  item,
  depth = 0,
  optionsActive,
  creatingChildId,
  onSelectItem,
  buildOptions,
  buildSubItemOptions,
  renderCreateChildEditor,
  renderEditNodeEditor,
  renderChildrenEditNodeEditor,
  draggable = false, // solo aplica a items
  overId,
}: RecursiveMenuItemProps) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Expande si se está creando un hijo en esta carpeta
  useEffect(() => {
    if (creatingChildId === item.id) setExpanded(true);
  }, [creatingChildId, item.id]);

  // Auto-expand al hacer hover con item en drag sobre la carpeta
  useEffect(() => {
    if (overId?.toString() === item.id && !expanded) {
      const t = setTimeout(() => setExpanded(true), 500);
      return () => clearTimeout(t);
    }
  }, [overId, item.id, expanded]);

  const handleSelect = useCallback(
    async (node: MenuServiceInterface | ItemsServiceMenu) => {
      onSelectItem?.(node);
      if (node.linkMenu) {
        dispatch(setLoading(true));
        await new Promise((r) => setTimeout(r, 300));
        dispatch(setLoading(false));
        navigate(`/${node.linkMenu}`);
      }
    },
    [dispatch, navigate, onSelectItem]
  );

  const passDownProps = useMemo(
    () => ({
      optionsActive,
      creatingChildId,
      onSelectItem: handleSelect,
      buildOptions,
      buildSubItemOptions,
      renderCreateChildEditor,
      renderEditNodeEditor,
      renderChildrenEditNodeEditor,
      draggable,
      overId,
    }),
    [
      optionsActive,
      creatingChildId,
      handleSelect,
      buildOptions,
      buildSubItemOptions,
      renderCreateChildEditor,
      renderEditNodeEditor,
      renderChildrenEditNodeEditor,
      draggable,
      overId,
    ]
  );

  return (
    <NodeContainer depth={depth}>
      <FolderHeaderDroppable
        item={item}
        depth={depth}
        expanded={expanded}
        overId={overId}
        optionsActive={optionsActive}
        onToggleExpand={() => setExpanded((v) => !v)}
        buildOptions={buildOptions}
        buildSubItemOptions={buildSubItemOptions}
        renderEditNodeEditor={renderEditNodeEditor}
      />

      {expanded && creatingChildId === item.id && (
        <InlineCreateChildEditor
          depth={depth}
          item={item}
          renderCreateChildEditor={renderCreateChildEditor}
        />
      )}

      {expanded && Array.isArray(item.children) && item.children.length > 0 && (
        <ChildrenList
          childrenNodes={item.children}
          renderChild={(child) => (
            <RecursiveMenuItem
              key={child.id}
              item={child}
              depth={depth + 1}
              {...passDownProps}
            />
          )}
        />
      )}

      {expanded && Array.isArray(item.items) && item.items.length > 0 && (
        <ItemsListSortable
          items={item.items}
          optionsActive={optionsActive}
          onClick={handleSelect}
          buildSubItemOptions={buildSubItemOptions}
          renderEditNodeEditor={renderChildrenEditNodeEditor}
          draggable={draggable}
        />
      )}
    </NodeContainer>
  );
}
