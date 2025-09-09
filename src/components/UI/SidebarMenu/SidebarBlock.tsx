import { Box, Divider, Stack, Typography } from "@mui/material";
import SidebarSection from "./SidebarSection";
import useCategoriesSidebar from "../../../config/hooks/sidebar/useCategoriesSidebar";
import useCollectionsSidebar from "../../../config/hooks/sidebar/useCollectionsSidebar";
import { useEffect, useState } from "react";
import { useSidebarDnd } from "../../../config/hooks/useSidebarDnd";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

function SidebarBlock({
  searchTerm,
  searchOnItem,
}: {
  searchTerm: string;
  searchOnItem: boolean;
}) {
  // Logs de props iniciales
  console.log(
    "[SidebarBlock] searchTerm:",
    searchTerm,
    "| searchOnItem:",
    searchOnItem
  );

  //Llenado de secciones
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [renameTemplateId, setRenameTemplateId] = useState<
    string | undefined
  >();
  const [creatingCategoryId, setCreatingCategoryId] = useState<
    string | undefined
  >();
  const [editingCollectionId, setEditingCollectionId] = useState<
    string | undefined
  >();
  const [renameTestCaseId, setRenameTestCaseId] = useState<
    string | undefined
  >();
  const [isCreatingCollection, setIsCreatingCollection] =
    useState<boolean>(false);

  const categories = useCategoriesSidebar({
    setEditingCategoryId,
    editingCategoryId,
    creatingCategoryId,
    setCreatingCategoryId,
    renameTemplateId,
    setRenameTemplateId,
  });

  const collections = useCollectionsSidebar({
    editingCollectionId,
    setEditingCollectionId,
    renameTestCaseId,
    setRenameTestCaseId,
    isCreatingCollection,
    setIsCreatingCollection,
  });

  //Drag and drop
  const [categoriesTree, setCategoriesTree] = useState(categories.resource);
  const [collectionsTree, setCollectionsTree] = useState(collections.resource);

  const { activeId, overId, dndContextProps } = useSidebarDnd({
    categoriesTree,
    collectionsTree,
    setCategoriesTree,
    setCollectionsTree,
  });

  useEffect(() => {
    setCategoriesTree(categories.resource);
  }, [categories.resource]);

  useEffect(() => {
    setCollectionsTree(collections.resource);
  }, [collections.resource]);

  return (
    <DndContext {...dndContextProps}>
      <Box>
        <SidebarSection
          searchOnItem={searchOnItem}
          searchTerm={searchTerm}
          overId={overId!}
          {...categories}
          resource={categoriesTree}
        />
        <Divider />
        <SidebarSection
          searchOnItem={searchOnItem}
          searchTerm={""}
          overId={overId!}
          {...collections}
          resource={collectionsTree}
        />
      </Box>
      <DragOverlay style={{ cursor: "grabbing" }}>
        {activeId ? (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              flexGrow: 1,
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <DragIndicatorIcon sx={{ fontSize: 12, color: "text.disabled" }} />
            <DescriptionOutlinedIcon
              sx={{ fontSize: 16, color: "text.disabled" }}
            />
            <Typography
              sx={{
                fontSize: 12,
                color: "text.disabled",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {activeId}
            </Typography>
          </Stack>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default SidebarBlock;
