import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  ContextMenuOption,
  ItemsServiceMenu,
  MenuServiceInterface,
} from "../../interfaces";
import { hasPermission } from "../../utils/permissions";
import { useAuth } from "../useAuth";
import { createSessionThunk } from "../../../store/slices/sessions/session.thunk";
import { openConfirmDeleteModal } from "../../../store/slices/UI/confirmDeleteModal/confirmDeleteModal.slice";
import EditNodeEditor from "../../../components/navigation/EditNodeEditor";
import useCollectionsActions from "./useCollectionsActions";

interface useCollectionsSidebarProps {
    editingCollectionId: string | null;
    setEditingCollectionId: (id: string | null) => void;
    creatingCollectionId: string | undefined;
    setCreatingCollectionId: (id: string | undefined) => void;
}
const useCollectionsSidebar = ({
    setEditingCollectionId,
    editingCollectionId,
}: /* setCreatingCollectionId,
    creatingCollectionId, */
useCollectionsSidebarProps) => {
    const dispatch = useAppDispatch();
    const { permissions } = useAuth();

    const handleActions = useCollectionsActions({ setEditingCollectionId });

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
        [dispatch, permissions, setEditingCollectionId]
    );

    const buildSubItemOptions = (item: ItemsServiceMenu): ContextMenuOption[] => {
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
            action: () => console.log(item),
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

    return {
        resource: colectionsMenu,
        separatorMenuProps: {
        label: "Categorías",
        onAction: () => console.log("Onaction colecciiones"),
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
            onCancel={() => setEditingCollectionId(null)}
            />
        ) : null,
        renderSeparatorChildren: () => (
        <div>
            Holaaaaa!
        </div>
        ),
    };
};
export default useCollectionsSidebar;
