import { setLoading, useAppDispatch } from "../../store";
import {
  activExtractionRules,
  setUpdateInstitution,
  setUpdatePermission,
  setUpdateRol,
  setUpdateUser,
} from "../../store/slices/admin/admin.slice";
import { getExtractionRuleByIdThunk } from "../../store/slices/extractionsRules/extractionRules.thunk";
import { openConfirmDeleteModal } from "../../store/slices/UI/confirmDeleteModal/confirmDeleteModal.slice";
import { RESOURCE_MAP } from "../constants/tableSettings";
import { EntityType, RouteType } from "../interfaces/tableSettings.interface";
import {
  isInstitution,
  isPermission,
  isRol,
  isRule,
  isUserDB,
} from "../utils/tableSettings.utils";

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
          dispatch(
            setUpdateInstitution({ type: "update", institution: selectedItem })
          );
        }
        break;
      case "/settings/roles":
        if (isRol(selectedItem)) {
          dispatch(setUpdateRol({ type: "update", role: selectedItem }));
        }
        break;
      case "/settings/permissions":
        if (isPermission(selectedItem)) {
          dispatch(
            setUpdatePermission({ type: "update", permission: selectedItem })
          );
        }
        break;
      case "/settings/rule":
        if (isRule(selectedItem)) {
          dispatch(setLoading(true));
          dispatch(getExtractionRuleByIdThunk({ uuid: selectedItem.uuid }))
            .unwrap()
            .finally(() => {
              dispatch(setLoading(false));
            });
          dispatch(activExtractionRules(true));
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
