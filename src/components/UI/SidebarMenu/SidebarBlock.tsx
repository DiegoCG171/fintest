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
import { useCallback, useEffect } from "react";
import { useToast } from "../../../config/hooks/useToast";
import { deleteTestCaseThunk, getCollectionsThunk } from "../../../store/slices/collections/collections.thunk";

import { toggleCreateCollectionMenu, updateTestCase } from "../../../store/slices/UI/sidebarMenu/sidebarMenu.slice";
import { SidebarCreateCollection } from "./SidebarCreateCollection";

function SidebarBlock() {
  const dispatch = useAppDispatch();
  const categoriesMenu = useAppSelector(
    (state) => state.sidebarMenu.categoriesMenu
  );
  const collectionsMenu = useAppSelector(
    (state) => state.sidebarMenu.collectionsMenu
  );
  const createCollectionMenu = useAppSelector(
    (state) => state.sidebarMenu.createCollectionMenu
  );
  const { showToast } = useToast();

  const handleModal = useCallback(
    (mode: "create" | "edit") => {
      dispatch(openModal({ mode }));
    },
    [dispatch]
  );

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

  const buildedCollectionOptions = (item: ItemsServiceMenu): ContextMenuOption[] => [
    {
      item: { label: "Editar caso de prueba", id: item.id },
      action: () => dispatch(updateTestCase(item)),
    },
    {
      item: { label: "Eliminar caso de prueba", id: item.id },
      action: () => dispatch(deleteTestCaseThunk(item.id)),
    },
  ];
  const handleOpenCreateCollection = () => {
    dispatch(toggleCreateCollectionMenu(true));
  };

  useEffect(() => {
    dispatch(getCollectionsThunk());
  }, [dispatch]);

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
        <SeparatorMenu
          onAction={handleOpenCreateCollection}
          label="Colecciones"
        ></SeparatorMenu>
        {collectionsMenu.map((rootItem, index) => (
          <RecursiveMenuItem
            key={`${index}-${rootItem?.id ?? rootItem.name}`}
            item={rootItem}
            optionsActive={true}
            onSelectItem={handleSelectItem}
            buildOptions={buildedCollectionOptions}
          />
        ))}
        {createCollectionMenu && <SidebarCreateCollection />}
      </Box>
    </Box>
  );
}
export default SidebarBlock;
