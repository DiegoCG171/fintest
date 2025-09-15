import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  ContextMenuOption,
  ItemsServiceMenu,
  MenuServiceInterface,
} from "../../interfaces";
import { hasPermission } from "../../utils/permissions";
import { useAuth } from "../useAuth";
import { openConfirmDeleteModal } from "../../../store/slices/UI/confirmDeleteModal/confirmDeleteModal.slice";
import EditNodeEditor from "../../../components/navigation/EditNodeEditor";
import useCollectionsActions from "./useCollectionsActions";
import CreateNodeEditor from "../../../components/navigation/CreateNodeEditor";

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
interface useCollectionsSidebarProps {
    editingCollectionId: string | undefined;
    setEditingCollectionId: (id: string | undefined) => void;
    isCreatingCollection: boolean;
    setIsCreatingCollection: Setter<boolean>;
    renameTestCaseId: string | undefined;
    setRenameTestCaseId: (id: string | undefined) => void;
}
const useCollectionsSidebar = ({
    editingCollectionId,
    setEditingCollectionId,
    isCreatingCollection,
    setIsCreatingCollection,
    setRenameTestCaseId,
    renameTestCaseId,
    }: useCollectionsSidebarProps) => {
    const dispatch = useAppDispatch();
    const { permissions } = useAuth();

    const canCreate = hasPermission(permissions, "create", "collection");

    const handleActions = useCollectionsActions({
        setEditingCollectionId,
        setRenameTestCaseId,
        setIsCreatingCollection,
    });

    const colectionsMenu = useAppSelector(
        (state) => state.sidebarMenu.menus["collection"]
    );

    const buildOptions = useCallback(
        (item: ItemsServiceMenu): ContextMenuOption[] => {
        const options: ContextMenuOption[] = [];

        if (hasPermission(permissions, "create", "session")) {
            options.push({
            item: { label: "Ejecutar", id: item.id },
            action: () => {
                handleActions.createSession(item.id, 'collection');
            },
            });
        }

        if (hasPermission(permissions, "update", "collection")) {
            options.push({
            item: { label: "Renombrar", id: item.id },
            action: () => {
                setEditingCollectionId(item.id);
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
        },
        [dispatch, handleActions, permissions, setEditingCollectionId]
    );

    const buildSubItemOptions = useCallback(
        (item: ItemsServiceMenu): ContextMenuOption[] => {
        const options: ContextMenuOption[] = [];

        if (hasPermission(permissions, "create", "session")) {
            options.push({
            item: { label: "Ejecutar", id: item.id },
            action: () => {
                handleActions.createSession(item.id, 'testCase');
            },
            });
        }

        if (hasPermission(permissions, "update", "testCase")) {
            options.push({
            item: { label: "Renombrar", id: item.id },
            action: () => setRenameTestCaseId(item.id),
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
        },
        [dispatch, handleActions, permissions, setRenameTestCaseId]
    );

    return {
        resource: colectionsMenu,
        separatorMenuProps: {
        label: "Categorías",
        onAction: canCreate ? () => setIsCreatingCollection(true) : undefined,
        },
        optionsActive: true,
        draggable: true,
        buildOptions,
        buildSubItemOptions,
        renderEditNodeEditor: (item: MenuServiceInterface | ItemsServiceMenu) =>
        editingCollectionId === item.id ? (
            <EditNodeEditor
            item={item}
            onSubmit={(newName) =>
                handleActions.renameCollection(item.id, newName)
            }
            onCancel={() => setEditingCollectionId(undefined)}
            />
        ) : null,
        renderChildrenEditNodeEditor: (
        item: MenuServiceInterface | ItemsServiceMenu
        ) =>
        renameTestCaseId === item.id ? (
            <EditNodeEditor
            item={item}
            onSubmit={(newName) => handleActions.renameTestCase(item.id, newName)}
            onCancel={() => setRenameTestCaseId(undefined)}
            />
        ) : null,
        renderSeparatorChildren: () =>
        isCreatingCollection ? (
            <CreateNodeEditor
            placeholder="Nombre de Categoría"
            onSubmit={(name) => handleActions.createCollecetion(name)}
            onCancel={() => setIsCreatingCollection(false)}
            />
        ) : null,
    };
};
export default useCollectionsSidebar;
