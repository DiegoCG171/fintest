import { useAppDispatch } from "../../store";
import { setUpdateInstitution, setUpdatePermission, setUpdateRol, setUpdateUser } from "../../store/slices/admin/admin.slice";
import { openConfirmDeleteModal } from "../../store/slices/UI/confirmDeleteModal/confirmDeleteModal.slice";
import { RESOURCE_MAP } from "../constants/tableSettings";
import { EntityType, RouteType } from "../interfaces/tableSettings.interface";
import { isInstitution, isPermission, isRol, isUserDB } from "../utils/tableSettings.utils";


export const useTableActions = () => {
  const dispatch = useAppDispatch();

  const handleEdit = (pathname: RouteType, selectedItem: EntityType) => {
    switch (pathname) {
      case "/settings/users":
        if (isUserDB(selectedItem)) {
          dispatch(setUpdateUser({ type: "update", user: selectedItem }));
        }
        break;
      case "/settings/institutions":
        if (isInstitution(selectedItem)) {
          dispatch(setUpdateInstitution({ type: "update", institution: selectedItem }));
        }
        break;
      case "/settings/roles":
        if (isRol(selectedItem)) {
          dispatch(setUpdateRol({ type: "update", role: selectedItem }));
        }
        break;
      case "/settings/permissions":
        if (isPermission(selectedItem)) {
          dispatch(setUpdatePermission({ type: "update", permission: selectedItem }));
        }
        break;
    }
  };

  const handleDelete = (pathname: RouteType, selectedItem: EntityType) => {
    const resource = RESOURCE_MAP[pathname];

    dispatch(
      openConfirmDeleteModal({
        id: selectedItem.id,
        resource,
      })
    );
  };

  return { handleEdit, handleDelete };
};