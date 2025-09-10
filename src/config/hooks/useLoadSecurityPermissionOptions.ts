import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getAllSecurityPermissionsMenuOptionsThunk } from "../../store/slices/security/security.thunk";

export const useLoadSecurityPermissionOptions = () => {
  const dispatch = useAppDispatch();
  const { permissions } = useAppSelector((state) => state.admin);

  useEffect(() => {
    const newLimit = permissions.limit * permissions.pages || 1000;
    dispatch(
      getAllSecurityPermissionsMenuOptionsThunk({ page: 1, limit: newLimit })
    );
  }, [dispatch, permissions]);
};