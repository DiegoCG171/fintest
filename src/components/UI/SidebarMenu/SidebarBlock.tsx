import { Box, Divider } from "@mui/material";
import SeparatorMenu from "./SeparatorMenu";
import RecursiveMenuItem from "../../navigation/RecursiveMenuItem";
import {
  getTemplateByIdThunk,
  openModal,
  setLoading,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import {
  ContextMenuOption,
  ItemsServiceMenu,
  MenuServiceInterface,
} from "../../../config/interfaces";
import { useCallback } from "react";
import { useToast } from "../../../config/hooks/useToast";

function SidebarBlock() {
  const onEdit = (item: ItemsServiceMenu) => {
    console.log("Editando", item);
  };

  const buildedOptions = (item: ItemsServiceMenu): ContextMenuOption[] => [
    {
      item: { label: "Agregar a Colecciones", id: item.id },
      action: () => onEdit(item),
    },
    {
      item: { label: "Editar template", id: item.id },
      action: () => handleSelectItem(item),
    },
  ];
  const dispatch = useAppDispatch();
  const categoriesMenu = useAppSelector((state) => state.sidebarMenu.categoriesMenu)
  const collectionsMenu = useAppSelector((state) => state.sidebarMenu.collectionsMenu)
  const { showToast } = useToast();

  const handleModal = useCallback(
    (mode: "create" | "edit") => {
      dispatch(openModal({ mode }));
    },
    [dispatch]
  );

  const handleSelectItem = useCallback(
    async (item: MenuServiceInterface | ItemsServiceMenu) => {
      dispatch(setLoading(true));
      try {
        await dispatch(getTemplateByIdThunk(item.id)).unwrap();
        dispatch(openModal({ mode: "edit" }));
      } catch (error) {
        showToast(error as string, "error");
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, showToast]
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
        {Array.isArray(categoriesMenu) &&
          categoriesMenu.map((rootItem, index) => (
            <RecursiveMenuItem
              key={`${index}-${rootItem.id}`}
              item={rootItem}
              optionsActive={true}
              onSelectItem={handleSelectItem}
              buildOptions={buildedOptions}
            />
          ))}
      </Box>
      <Divider />
      <Box
        sx={{ px: 1, overflowY: "auto", flexGrow: 1, my: 4, marginRight: 1 }}
        key={"box-colecciones"}
      >
        <SeparatorMenu label="Colecciones"></SeparatorMenu>
        {collectionsMenu.map((rootItem, index) => (
          <RecursiveMenuItem
            key={`${index}-${rootItem?.id ?? rootItem.name}`}
            item={rootItem}
            optionsActive={false}
          />
        ))}
      </Box>
    </Box>
  );
}
export default SidebarBlock;
