import { Box, Divider } from "@mui/material";
import SidebarSection from "./SidebarSection";
import useCategoriesSidebar from "../../../config/hooks/sidebar/useCategoriesSidebar";
import useCollectionsSidebar from "../../../config/hooks/sidebar/useCollectionsSidebar";
import { useState } from "react";

function SidebarBlock({
  searchTerm,
  searchOnItem,
}: {
  searchTerm: string;
  searchOnItem: boolean;
}) {
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

  const [isCreatingCollection, setIsCreatingCollection] = useState<boolean>(false);

  const categories = useCategoriesSidebar({
    setEditingCategoryId,
    editingCategoryId,
    creatingCategoryId,
    setCreatingCategoryId,
    renameTemplateId,
    setRenameTemplateId
  });

  const collections = useCollectionsSidebar({
    editingCollectionId,
    setEditingCollectionId,
    renameTestCaseId,
    setRenameTestCaseId,
    isCreatingCollection,        
    setIsCreatingCollection, 
  });

  return (
    <Box>
      <SidebarSection
        searchOnItem={searchOnItem}
        searchTerm={searchTerm}
        {...categories}
      />
      <Divider />
      <SidebarSection
        searchOnItem={searchOnItem}
        searchTerm={searchTerm}
        {...collections}
      />
    </Box>
  );
}

export default SidebarBlock;
