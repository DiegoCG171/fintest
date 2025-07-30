import { Box, Divider } from "@mui/material";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import SeparatorMenu from "./SeparatorMenu";
import RecursiveMenuItem from "../../navigation/RecursiveMenuItem";
import {
  createCategorieThunk,
  createTemplateThunk,
  deleteCategorieThunk,
  getCategoriesByMethodThunk,
  getTemplateByIdThunk,
  getTemplatesThunk,
  openModal,
  setLoading,
  updateCategorieThunk,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import {
  ContextMenuOption,
  ItemsServiceMenu,
  MenuServiceInterface,
} from "../../../config/interfaces";
import { useCallback, useMemo, useState } from "react";
import { useToast } from "../../../config/hooks/useToast";
import {
  getCollectionsThunk,
} from "../../../store/slices/collections/collections.thunk";

import {
  toggleCreateCollectionMenu,
  updateCollection,
  updateTestCase,
} from "../../../store/slices/UI/sidebarMenu/sidebarMenu.slice";
import { SidebarCreateCollection } from "./SidebarCreateCollection";
import { createSessionThunk } from "../../../store/slices/sessions/session.thunk";
import { cleanObject } from "../../../config/utils/cleandObject";
import PermissionGuard from "../../../config/guards/PermissionGuard";
import { hasPermission } from "../../../config/utils/permissions";
import { useAuth } from "../../../config/hooks/useAuth";
import { useParams } from "react-router-dom";
import { getTemplatesBackup } from "../../../services";
import { openConfirmDeleteModal } from "../../../store/slices/UI/confirmDeleteModal/confirmDeleteModal.slice";

function SidebarBlock({
  searchTerm,
  searchOnItem,
}: {
  searchTerm: string;
  searchOnItem: boolean;
}) {
  const dispatch = useAppDispatch();
  const { permissions } = useAuth();

  const { method, type } = useParams();

  const categoriesMenu = useAppSelector(
    (state) => state.sidebarMenu.categoriesMenu
  );
  const collectionsMenu = useAppSelector(
    (state) => state.sidebarMenu.collectionsMenu
  );
  const createCollectionMenu = useAppSelector(
    (state) => state.sidebarMenu.createCollectionMenu
  );
  const { templates } = useAppSelector((state) => state.templates);
  const { showToast } = useToast();

  const [creatingChildId, setCreatingChildId] = useState<string | undefined>(
    undefined
  );

  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const renderEditNodeEditor = (item: MenuServiceInterface) => {
    if (editingItemId !== item.id) return null;

    return (
      <ItemInlineEditor
        icon={<FolderOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} /> }
        initialValue={item.name}
        placeholder="Nuevo nombre"
        onSubmit={async (newName: string) => {
          try {
            await dispatch(
              updateCategorieThunk({ id: item.id, data: { name: newName } })
            ).unwrap();
            await dispatch(
              getCategoriesByMethodThunk(`${method}/${type}`)
            ).unwrap();
            setEditingItemId(null);
            showToast("Categoría editada exitoramente", "success");
          } catch (error) {
            showToast(
              error as string | "Error al renombrar categoría",
              "error"
            );
          }
        }}
        onCancel={() => setEditingItemId(null)}
      />
    );
  };

  const renderCreateChildEditor = (item: MenuServiceInterface) => {
    if (creatingChildId !== item.id) return null;

    return (
      <Box sx={{ pl: 1, mt: 0.5 }}>
        <ItemInlineEditor
          icon={<FolderOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} /> }
          placeholder="Nombre de Categoría"
          onSubmit={async (name: string) => {
            createCategory(name);
          }}
          onCancel={() => setCreatingChildId(undefined)}
        />
      </Box>
    );
  };

  const createCategory = async (name: string): Promise<void> => {
    if (!creatingChildId) return;
    const body = {
      name,
      parent: creatingChildId,
    };

    try {
      await dispatch(createCategorieThunk(body)).unwrap();
      await dispatch(getCategoriesByMethodThunk(`${method}/${type}`)).unwrap();
      setCreatingChildId(undefined);
      showToast("Categoría creada exitoramente", "success");
    } catch (error) {
      showToast(error as string | "Error al crear la categoría", "error");
    }
  };

  const addToCollections = (item: ItemsServiceMenu) => {
    dispatch(
      openModal({
        componentKey: "ModalAddToCollection",
        componentProps: { templateId: item.id },
      })
    );
  };

  const deleteCategorie = async (id: string) => {
    try {
      await dispatch(deleteCategorieThunk(id)).unwrap();
      await dispatch(getCategoriesByMethodThunk(`${method}/${type}`)).unwrap();
      showToast("Categoría eliminada exitoramente", "success");
    } catch (error) {
      showToast(error as string | "Error al eliminar la categoría", "error");
    }
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

  const buildedOptions = (item: ItemsServiceMenu): ContextMenuOption[] => {
    const options: ContextMenuOption[] = [];

    if (hasPermission(permissions, "create", "category")) {
      options.push({
        item: { label: "Añadir", id: item.id },
        action: () => setCreatingChildId(item.id),
      });
    }

    if (hasPermission(permissions, "update", "category")) {
      options.push({
        item: { label: "Renombrar", id: item.id },
        action: () => {
          setCreatingChildId(undefined);
          setEditingItemId(item.id);
        },
      });
    }

    if (hasPermission(permissions, "delete", "category")) {
      options.push({
        item: { label: "Eliminar", id: item.id },
        action: () => deleteCategorie(item.id),
      });
    }

    return options;
  };

  const buildedTemplateOptions = (
    item: ItemsServiceMenu
  ): ContextMenuOption[] => {
    const options: ContextMenuOption[] = [];

    if (hasPermission(permissions, "create", "collection")) {
      options.push({
        item: { label: "Agregar a Colecciones", id: item.id },
        action: () => addToCollections(item),
      });
    }

    if (hasPermission(permissions, "create", "template")) {
      options.push({
        item: { label: "Duplicar", id: item.id },
        action: async () => {
          const originalTemplate = templates.find(
            (template) => template.uuid === item.id
          );

          if (!originalTemplate) {
            showToast("Template no encontrado", "error");
            return;
          }

          const copyTemplate = cleanObject(originalTemplate);

          try {
            await dispatch(
              createTemplateThunk({
                template: {
                  ...copyTemplate,
                  name: `${copyTemplate.name} copia`,
                },
              })
            ).unwrap();

            showToast("Copia del template creada correctamente", "success");
          } catch (error) {
            showToast(error as string, "error");
          } finally {
            dispatch(getTemplatesThunk());
            dispatch(getCategoriesByMethodThunk(`${method}/${type}`))
              .unwrap()
              .catch((err: string) =>
                console.error("Error cargando categorías:", err)
              );
          }
        },
      });
    }

    if (hasPermission(permissions, "update", "template")) {
      options.push({
        item: { label: "Editar template", id: item.id },
        action: () => handleSelectItem(item),
      });
    }

    return options;
  };

  const buildedCollectionOptions = (
    item: ItemsServiceMenu
  ): ContextMenuOption[] => {
    const options: ContextMenuOption[] = [];

    if (hasPermission(permissions, "create", "session")) {
      options.push({
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
      });
    }

    if (hasPermission(permissions, "update", "collection")) {
      options.push({
        item: { label: "Renombrar", id: item.id },
        action: () => {
          dispatch(updateCollection(item));
          dispatch(getCollectionsThunk(`${method}/${type}`));
        },
      });
    }

    if (hasPermission(permissions, "delete", "collection")) {
      options.push({
        item: { label: "Eliminar", id: item.id },
        action: async () => {
          dispatch(
            openConfirmDeleteModal({ id: item.id, resource: "collection" })
          );
        },
      });
    }

    return options;
  };

  const buildedTestCaseOptions = (
    item: ItemsServiceMenu
  ): ContextMenuOption[] => {
    const options: ContextMenuOption[] = [];

    if (hasPermission(permissions, "create", "session")) {
      options.push({
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
      });
    }

    if (hasPermission(permissions, "update", "testCase")) {
      options.push({
        item: { label: "Renombrar", id: item.id },
        action: () => dispatch(updateTestCase(item)),
      });
    }

    if (hasPermission(permissions, "delete", "testCase")) {
      options.push({
        item: { label: "Eliminar", id: item.id },
        action: async () => {
          dispatch(
            openConfirmDeleteModal({ id: item.id, resource: "testCase" })
          );
        },
      });
    }

    return options;
  };

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
      searchOnFile: boolean
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
        ?.map((category) =>
          filterRecursive(category, normalized, !searchOnItem)
        )
        .filter((item): item is MenuServiceInterface => item !== null) ?? [];

    const filteredCollections =
      collectionsMenu
        ?.map((category) =>
          filterRecursive(category, normalized, !searchOnItem)
        )
        .filter((item): item is MenuServiceInterface => item !== null) ?? [];
    return { filteredCategories, filteredCollections };
  }, [
    searchTerm,
    categoriesMenu,
    collectionsMenu,
    filterRecursive,
    searchOnItem,
  ]);

  return (
    <Box>
      <Box
        sx={{ px: 1, overflowY: "auto", flexGrow: 1, my: 4, marginRight: 1 }}
        key={"box-catalogo"}
      >
        <PermissionGuard
          permissions={[{ action: "read", resource: "template" }]}
        >
          <SeparatorMenu
            label="Catálogo"
            onAction={handleModal}
            onDownload={() => getTemplatesBackup()}
            permissions={[{ action: "create", resource: "template" }]}
          />
          {filteredCategories.length > 0 ? (
            filteredCategories.map((rootItem, index) => (
              <RecursiveMenuItem
                key={`${index}-${rootItem.id}`}
                item={rootItem}
                optionsActive={true}
                onSelectItem={handleSelectItem}
                buildOptions={buildedOptions}
                buildSubItemOptions={buildedTemplateOptions}
                renderCreateChildEditor={renderCreateChildEditor}
                renderEditNodeEditor={renderEditNodeEditor}
                creatingChildId={creatingChildId}
              />
            ))
          ) : (
            <Box sx={{ px: 2, py: 1, fontSize: 14, color: "gray" }}>
              Sin resultados
            </Box>
          )}
        </PermissionGuard>
      </Box>
      <Divider />
      <Box
        sx={{ px: 1, overflowY: "auto", flexGrow: 1, my: 4, marginRight: 1 }}
        key={"box-colecciones"}
      >
        <PermissionGuard
          permissions={[{ action: "read", resource: "collection" }]}
        >
          <SeparatorMenu
            permissions={[{ action: "create", resource: "collection" }]}
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
        </PermissionGuard>
      </Box>
    </Box>
  );
}

export default SidebarBlock;
