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
import { useEffect, useState } from "react";

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

  function findFullPathToNode(
    nodes: MenuServiceInterface[],
    targetId: string,
    path: string[] = []
  ): string[] | null {
    for (const node of nodes) {
      const currentPath = [...path, node.id];
      if (node.id === targetId) return currentPath;

      if (node.children?.length) {
        const childPath = findFullPathToNode(node.children, targetId, currentPath);
        if (childPath) return childPath;
      }
    }
    return null;
  }

  function findNodeById(
    nodes: MenuServiceInterface[],
    id: string
  ): MenuServiceInterface | null {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children?.length) {
        const result = findNodeById(node.children, id);
        if (result) return result;
      }
    }
    return null;
  }

  useEffect(() => {
    if (!preselectedItemId) return;

    const path = findFullPathToNode(root, preselectedItemId);

    if (path) {
      setExpanded(path);
      setSelectedNodeId(preselectedItemId);
      let currentNode: MenuServiceInterface | null = null;
      for (const id of path) {
        currentNode = currentNode
          ? currentNode.children?.find((c) => c.id === id) ?? null
          : findNodeById(root, id);
      }

      if (currentNode && currentNode.items?.[0]) {
        onItemSelected(currentNode.items[0]);
      }
    }
  }, [root, preselectedItemId]);

  const handleFolderClick = (node: MenuServiceInterface) => {
    setSelectedNodeId(node.id);
    setExpanded((prev) => [...new Set([...prev, node.id])]);

    if (node.items?.[0]) {
      onItemSelected(node.items[0]);
    }
  };

  const renderTree = (
    nodes: MenuServiceInterface[],
    level = 0
  ): React.ReactNode =>
    nodes.map((node) => {
      const isSelected = node.id === selectedNodeId;
      return (
        <TreeItem
          key={`${node.id}-${level}`}
          itemId={node.id}
          label={
            <Stack direction="row" gap={2}>
              <FolderOutlinedIcon />
              {node.name}
            </Stack>
          }
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleFolderClick(node);
          }}
          sx={{
            ...(isSelected && {
              backgroundColor: "primary.light",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "primary.main",
            }),
          }}
        >
          {node.children?.map((child) =>
            renderTree([child], level + 1)
          )}
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
        >
          {renderTree(root)}
        </SimpleTreeView>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No hay categorías disponibles.
        </Typography>
      )}
    </Box>
  );
}
