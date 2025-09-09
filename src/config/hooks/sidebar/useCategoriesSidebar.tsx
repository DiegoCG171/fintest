import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { openConfirmDeleteModal } from "../../../store/slices/UI/confirmDeleteModal/confirmDeleteModal.slice";
import {
    ContextMenuOption,
    ItemsServiceMenu,
    MenuServiceInterface,
} from "../../interfaces";
import { hasPermission } from "../../utils/permissions";
import { useAuth } from "../useAuth";
import useCategoriesActions from "./useCategoriesActions";
import EditNodeEditor from "../../../components/navigation/EditNodeEditor";
import CreateNodeEditor from "../../../components/navigation/CreateNodeEditor";

interface UseCategoriesSidebarProps {
    editingCategoryId: string | null;
    setEditingCategoryId: (id: string | null) => void;
    creatingCategoryId: string | undefined;
    setCreatingCategoryId: (id: string | undefined) => void;
    renameTemplateId: string | undefined;
    setRenameTemplateId: (id: string | undefined) => void;
}

const useCategoriesSidebar = ({
    setEditingCategoryId,
    editingCategoryId,
    setCreatingCategoryId,
    creatingCategoryId,
    setRenameTemplateId,
    renameTemplateId,
}: UseCategoriesSidebarProps) => {
    const dispatch = useAppDispatch();
    const { permissions } = useAuth();
    const handleActions = useCategoriesActions({
        setEditingCategoryId,
        setCreatingCategoryId,
        setRenameTemplateId,
    });

    const canDownload = hasPermission(permissions, "read", "template");

    const categoriesMenu = useAppSelector(
        (state) => state.sidebarMenu.menus["category"]
    );

    const buildOptions = useCallback(
        (item: ItemsServiceMenu): ContextMenuOption[] => {
        const options: ContextMenuOption[] = [];

        if (hasPermission(permissions, "create", "category")) {
            options.push({
            item: { label: "Añadir", id: item.id },
            action: () => {
                setCreatingCategoryId(item.id);
            },
            });
        }

        if (hasPermission(permissions, "update", "category")) {
            options.push({
            item: { label: "Renombrar", id: item.id },
            action: () => setEditingCategoryId(item.id),
            });
        }

        if (hasPermission(permissions, "delete", "category")) {
            options.push({
            item: { label: "Eliminar", id: item.id },
            action: () =>
                dispatch(
                openConfirmDeleteModal({ id: item.id, resource: "category" })
                ),
            });
        }

        return options;
        },
        [dispatch, permissions, setEditingCategoryId, setCreatingCategoryId]
    );

    const buildSubItemOptions = useCallback(
        (item: ItemsServiceMenu): ContextMenuOption[] => {
        const options: ContextMenuOption[] = [];

        if (hasPermission(permissions, "create", "collection")) {
            options.push({
            item: { label: "Agregar a Colecciones", id: item.id },
            action: () => handleActions.addToCollections(item.id),
            });
        }

        if (hasPermission(permissions, "create", "template")) {
            options.push({
            item: { label: "Duplicar", id: item.id },
            action: async () => {
                handleActions.duplicateTemplate(item.id);
            },
            });
        }

        if (hasPermission(permissions, "update", "template")) {
            options.push({
            item: { label: "Editar template", id: item.id },
            action: async () => handleActions.editTemplate(item.id),
            });
        }
        
        if (hasPermission(permissions, "update", "template")) {
            options.push({
            item: { label: "Renombrar", id: item.id },
            action: () => setRenameTemplateId(item.id),
            });
        }

        if (hasPermission(permissions, "delete", "template")) {
            options.push({
            item: { label: "Eliminar template", id: item.id },
            action: () => {
                dispatch(
                openConfirmDeleteModal({ id: item.id, resource: "template" })
                );
            },
            });
        }

        return options;
        },
        [permissions, handleActions, dispatch, setRenameTemplateId]
    );

    return {
        resource: categoriesMenu,
        separatorMenuProps: {
        label: "Catálogo",
        onAction: () => handleActions.createTemplate(),
        ...(canDownload && { onDownload: handleActions.downloadTemplates }),
        },
        creatingChildId: creatingCategoryId,
        optionsActive: true,
        draggable: false,
        buildOptions,
        buildSubItemOptions,
        renderEditNodeEditor: (item: MenuServiceInterface | ItemsServiceMenu) =>
        editingCategoryId === item.id ? (
            <EditNodeEditor
            item={item}
            onSubmit={(newName) => handleActions.renameCategory(item.id, newName)}
            onCancel={() => setEditingCategoryId(null)}
            />
        ) : null,
        renderCreateChildEditor: (item: MenuServiceInterface | ItemsServiceMenu) =>
        creatingCategoryId === item.id ? (
            <CreateNodeEditor
            placeholder="Nombre de Categoría"
            onSubmit={(name) => handleActions.createCategory(name, item.id)}
            onCancel={() => setCreatingCategoryId(undefined)}
            />
        ) : null,
        renderChildrenEditNodeEditor: (
        item: MenuServiceInterface | ItemsServiceMenu
        ) =>
        renameTemplateId === item.id ? (
            <EditNodeEditor
                item={item}
                onSubmit={(newName) =>
                handleActions.renameTemplate(item.id, newName)
                }
                onCancel={() => setRenameTemplateId(undefined)}
            />
        ) : null,
    };
};
export default useCategoriesSidebar;
