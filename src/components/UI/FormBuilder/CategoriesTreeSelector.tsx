import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import {
  ItemsServiceMenu,
  MenuServiceInterface,
} from "../../../config/interfaces";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { Stack } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  root: MenuServiceInterface[];
  onItemSelected: (item: ItemsServiceMenu) => void;
  preselectedItemId?: string;
}

export default function CategoriesTreeSelector({
  root,
  onItemSelected,
  preselectedItemId,
}: Props) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const preselectedUsed = useRef(false);

  const findFullPathToNode = useCallback(
    (
      nodes: MenuServiceInterface[],
      targetId: string,
      path: string[] = []
    ): string[] | null => {
      for (const node of nodes) {
        const currentPath = [...path, node.id];
        if (node.id === targetId) return currentPath;

        if (node.children?.length) {
          const childPath = findFullPathToNode(
            node.children,
            targetId,
            currentPath
          );
          if (childPath) return childPath;
        }
      }
      return null;
    },
    []
  );

  const findNodeById = useCallback(
    (
      nodes: MenuServiceInterface[],
      id: string
    ): MenuServiceInterface | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children?.length) {
          const result = findNodeById(node.children, id);
          if (result) return result;
        }
      }
      return null;
    },
    []
  );

  useEffect(() => {
    if (!preselectedItemId || preselectedUsed.current) return;

    const path = findFullPathToNode(root, preselectedItemId);

    if (path) {
      setExpanded((prev) => [...new Set([...prev, ...path])]);
      setSelectedNodeId(preselectedItemId);

      let currentNode: MenuServiceInterface | null = null;
      for (const id of path) {
        currentNode = currentNode
          ? currentNode.children?.find((c) => c.id === id) ?? null
          : findNodeById(root, id);
      }

      if (currentNode) {
        onItemSelected(currentNode);
      }

      preselectedUsed.current = true;
    }
  }, [
    root,
    preselectedItemId,
    findFullPathToNode,
    findNodeById,
    onItemSelected,
  ]);

  const handleFolderClick = (node: MenuServiceInterface) => {
    setSelectedNodeId(null);

    setTimeout(() => {
      setSelectedNodeId(node.id);
    }, 0);

    setExpanded((prev) => [...new Set([...prev, node.id])]);

    onItemSelected(node);
  };

  const renderTree = (
    nodes: MenuServiceInterface[],
    level = 0
  ): React.ReactNode =>
    nodes.map((node) => {
      return (
        <TreeItem
          key={`${node.id}-${level}`}
          itemId={node.id}
          label={
            <Stack
              direction="row"
              gap={2}
              alignItems="center"
            >
              <FolderOutlinedIcon />
              {node.name}
            </Stack>
          }
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleFolderClick(node);
          }}
        >
          {node.children?.map((child) => renderTree([child], level + 1))}
        </TreeItem>
      );
    });

  return (
    <Box
      sx={{
        height: "70%",
        minWidth: 250,
        overflowY: "auto",
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: 2,
        border: "1px solid #D1D1D1",
      }}
    >
      {root.length > 0 ? (
        <SimpleTreeView
          expandedItems={expanded}
          onExpandedItemsChange={(_, ids) => setExpanded(ids)}
          selectedItems={selectedNodeId ?? ""}
          onSelectedItemsChange={(_, ids) => {
            const id = ids ? ids[0] : "";
            setSelectedNodeId(id);
            const selected = findNodeById(root, id);
            if (selected) onItemSelected(selected);
          }}
        >
          {renderTree(root)}
        </SimpleTreeView>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
        >
          No hay categorías disponibles.
        </Typography>
      )}
    </Box>
  );
}
