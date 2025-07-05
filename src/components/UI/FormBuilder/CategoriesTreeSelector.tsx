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

interface Props {
  root: MenuServiceInterface[];
  onItemSelected: (item: ItemsServiceMenu) => void;
}

export default function CategoriesTreeSelector({
  root,
  onItemSelected,
}: Props) {
  const handleFolderClick = (item: MenuServiceInterface) => {
    onItemSelected(item);
  };

  const renderTree = (
    nodes: MenuServiceInterface[],
    level = 0
  ): React.ReactNode =>
    nodes.map((node) => (
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
      >
        {(node.children ?? []).map((child) => renderTree([child]))}
      </TreeItem>
    ));

  return (
    <Box sx={{ height: "70%", minWidth: 250, overflowY: "auto", backgroundColor:(theme) => theme.palette.background.paper, borderRadius: 2, border: "1px solid #D1D1D1" }}>
      {root.length > 0 ? (
        <SimpleTreeView>{renderTree(root)}</SimpleTreeView>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No hay categorías disponibles.
        </Typography>
      )}
    </Box>
  );
}
