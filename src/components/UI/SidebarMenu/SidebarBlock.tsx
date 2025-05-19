import { Box } from "@mui/material";
import SeparatorMenu from "./SeparatorMenu";
import RecursiveMenuItem from "../../navigation/RecursiveMenuItem";
import { mockCategories, staticMenuItems } from "../../../config/mock";
import {
  getTemplateByIdThunk,
  openModal,
  useAppDispatch,
} from "../../../store";
import {
  ItemsServiceMenu,
  MenuServiceInterface,
} from "../../../config/interfaces";
import { useCallback } from "react";

function SidebarBlock() {
  const dispatch = useAppDispatch();

  const handleModal = useCallback(
    (mode: "create" | "edit") => {
      dispatch(openModal({ mode }));
    },
    [dispatch]
  );

  const handleSelectItem = useCallback(
    (item: MenuServiceInterface | ItemsServiceMenu) => {
      dispatch(getTemplateByIdThunk(item.id));
      handleModal("edit");
    },
    [dispatch, handleModal]
  );

  return (
    <Box>
      <Box
        sx={{ px: 1, overflowY: "auto", flexGrow: 1, my: 4, marginRight: 1 }}
        key={"box-catalogo"}
      >
        <SeparatorMenu
          label="Catálogo"
          onAction={() => handleModal("create")}
        ></SeparatorMenu>
        {mockCategories.map((rootItem, index) => (
          <RecursiveMenuItem
            key={`${index}-${rootItem.id}`}
            item={rootItem}
            onSelectItem={handleSelectItem}
          />
        ))}
      </Box>
      <Box
        sx={{ px: 1, overflowY: "auto", flexGrow: 1, my: 4, marginRight: 1 }}
        key={"box-colecciones"}
      >
        <SeparatorMenu
          label="Colecciones"
        ></SeparatorMenu>
        {staticMenuItems.map((rootItem, index) => (
          <RecursiveMenuItem
            key={`${index}-${rootItem?.id ?? rootItem.name}` }
            item={rootItem}
          />
        ))}
      </Box>
    </Box>
  );
}
export default SidebarBlock;
