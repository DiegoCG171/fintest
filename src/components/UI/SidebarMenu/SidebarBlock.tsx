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
import { useCallback, useMemo } from "react";
import { useToast } from "../../../config/hooks/useToast";
import {
  deleteCollectionThunk,
  deleteTestCaseThunk,
} from "../../../store/slices/collections/collections.thunk";

import {
  toggleCreateCollectionMenu,
  updateCollection,
  updateTestCase,
} from "../../../store/slices/UI/sidebarMenu/sidebarMenu.slice";
import { SidebarCreateCollection } from "./SidebarCreateCollection";
import { createSessionThunk } from "../../../store/slices/sessions/session.thunk";

function SidebarBlock({
  searchTerm,
  searchOnItem,
}: {
  searchTerm: string;
  searchOnItem: boolean;
}) {
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

  const addToCollections = (item: ItemsServiceMenu) => {
    dispatch(
      openModal({
        componentKey: "ModalAddToCollection",
        componentProps: { templateId: item.id },
      })
    );
  };

  const handleSelectItem = useCallback(
    async (item: MenuServiceInterface | ItemsServiceMenu) => {
      dispatch(setLoading(true));
      try {
        await dispatch(getTemplateByIdThunk(item.id)).unwrap();
        dispatch(
          openModal({
            componentKey: "ModalFormJson",
            componentProps: { mode: "edit" },
          })
        );
      } catch (error) {
        showToast(error as string, "error");
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, showToast]
  );

  const buildedOptions = (item: ItemsServiceMenu): ContextMenuOption[] => [
    {
      item: { label: "Agregar a Colecciones", id: item.id },
      action: () => addToCollections(item),
    },
    {
      item: { label: "Editar template", id: item.id },
      action: () => handleSelectItem(item),
    },
  ];
  const buildedTemplateOptions = (
    item: ItemsServiceMenu
  ): ContextMenuOption[] => [
    {
      item: { label: "Agregar a Colecciones", id: item.id },
      action: () => addToCollections(item),
    },
    {
      item: { label: "Editar template", id: item.id },
      action: () => handleSelectItem(item),
    },
  ];

  const buildedCollectionOptions = (
    item: ItemsServiceMenu
  ): ContextMenuOption[] => [
    {
      item: { label: "Ejecutar", id: item.id },
      action: () => {
        dispatch(
          createSessionThunk({
            toExecute: [
              {
                runnableId: item.id,
                runnableType: "collection",
              },
            ],
          })
        );
      },
    },
    {
      item: { label: "Renombrar", id: item.id },
      action: () => dispatch(updateCollection(item)),
    },
    {
      item: { label: "Eliminar", id: item.id },
      action: () => {
        dispatch(deleteCollectionThunk(item.id));
      },
    },
  ];

  const buildedTestCaseOptions = (
    item: ItemsServiceMenu
  ): ContextMenuOption[] => [
    {
      item: { label: "Ejecutar", id: item.id },
      action: () => {
        dispatch(
          createSessionThunk({
            toExecute: [
              {
                runnableId: item.id,
                runnableType: "testCase",
              },
            ],
          })
        );
      },
    },
    {
      item: { label: "Renombrar", id: item.id },
      action: () => dispatch(updateTestCase(item)),
    },
    {
      item: { label: "Eliminar", id: item.id },
      action: () => {
        dispatch(deleteTestCaseThunk(item.id));
      },
    },
  ];

  const handleOpenCreateCollection = () => {
    dispatch(toggleCreateCollectionMenu(true));
  };

  const handleModal = useCallback(() => {
    dispatch(
      openModal({
        componentKey: "ModalFormJson",
        componentProps: { mode: "create" },
      })
    );
  }, [dispatch]);

  const filterRecursive = useCallback(
  (
    node: MenuServiceInterface,
    term: string,
    searchOnFile: boolean,
  ): MenuServiceInterface | null => {
    const normalized = term.toLowerCase();

    const isNodeMatch = node.name?.toLowerCase().includes(normalized);
    const matchedItems =
      node.items?.filter((item) =>
        item.name.toLowerCase().includes(normalized)
      ) ?? [];

    const matchedChildren = (node.children ?? [])
      .map((child) => filterRecursive(child, term, searchOnFile))
      .filter((child): child is MenuServiceInterface => child !== null);

    if (searchOnFile) {
      if (isNodeMatch) {
        return {
          ...node,
          items: matchedItems,
          children: matchedChildren,
        };
      }
      if (matchedItems.length > 0 || matchedChildren.length > 0) {
        return {
          ...node,
          items: matchedItems,
          children: matchedChildren,
        };
      }
      return null;
    }

    if (matchedItems.length > 0 || matchedChildren.length > 0) {
      return {
        ...node,
        items: matchedItems,
        children: matchedChildren,
      };
    }

    return null;
  },
  []
);


  const { filteredCategories, filteredCollections } = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      return {
        filteredCategories: categoriesMenu,
        filteredCollections: collectionsMenu,
      };
    }

    const filteredCategories =
      categoriesMenu
        ?.map((category) => filterRecursive(category, normalized, !searchOnItem))
        .filter((item): item is MenuServiceInterface => item !== null) ?? [];

    const filteredCollections =
      collectionsMenu
        ?.map((category) => filterRecursive(category, normalized, !searchOnItem))
        .filter((item): item is MenuServiceInterface => item !== null) ?? [];
    return { filteredCategories, filteredCollections };
  }, [searchTerm, categoriesMenu, collectionsMenu, filterRecursive, searchOnItem]);
  

  return (
    <Box>
      <Box
        sx={{ px: 1, overflowY: "auto", flexGrow: 1, my: 4, marginRight: 1 }}
        key={"box-catalogo"}
      >
        <SeparatorMenu label="Catálogo" onAction={handleModal} />
        {filteredCategories.length > 0 ? (
          filteredCategories.map((rootItem, index) => (
            <RecursiveMenuItem
              key={`${index}-${rootItem.id}`}
              item={rootItem}
              optionsActive={true}
              onSelectItem={handleSelectItem}
              buildOptions={buildedOptions}
              buildSubItemOptions={buildedTemplateOptions}
            />
          ))
        ) : (
          <Box sx={{ px: 2, py: 1, fontSize: 14, color: "gray" }}>
            Sin resultados
          </Box>
        )}
      </Box>
      <Divider />
      <Box
        sx={{ px: 1, overflowY: "auto", flexGrow: 1, my: 4, marginRight: 1 }}
        key={"box-colecciones"}
      >
        <SeparatorMenu
          label="Colecciones"
          onAction={handleOpenCreateCollection}
        />
        {createCollectionMenu && <SidebarCreateCollection />}
        {filteredCollections.length > 0 ? (
          filteredCollections.map((rootItem, index) => (
            <RecursiveMenuItem
              key={`${index}-${rootItem?.id ?? rootItem.name}`}
              item={rootItem}
              optionsActive={true}
              onSelectItem={handleSelectItem}
              buildOptions={buildedCollectionOptions}
              buildSubItemOptions={buildedTestCaseOptions}
            />
          ))
        ) : (
          <Box sx={{ px: 2, py: 1, fontSize: 14, color: "gray" }}>
            Sin resultados
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default SidebarBlock;
