import { useCallback } from "react";
import { createSessionThunk } from "../../../store/slices/sessions/session.thunk";
import { openConfirmDeleteModal } from "../../../store/slices/UI/confirmDeleteModal/confirmDeleteModal.slice";
import { ContextMenuOption, ItemsServiceMenu } from "../../interfaces";
import { hasPermission } from "../../utils/permissions";
import { useAppDispatch } from "../../../store";
import { useAuth } from "../useAuth";

const useTestCaseActions = () => {
    const dispatch = useAppDispatch();
    const { permissions } = useAuth();

    const buildTestCaseOptions = useCallback(
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
                    action: () => 
                        console.log(item)
                });
            }

            if (hasPermission(permissions, "delete", "testCase")) {
                options.push({
                    item: { label: "Eliminar", id: item.id },
                    action: () =>
                        dispatch(
                            openConfirmDeleteModal({ id: item.id, resource: "testCase" })
                        ),
                });
            }

            return options;
        },
        [dispatch, permissions]
    );

    return { buildTestCaseOptions };

}
export default useTestCaseActions