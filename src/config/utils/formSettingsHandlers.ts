
import { createUserThunk, updateUserThunk } from "../../store";
import { createInstitutionThunk, updateInstitutionsThunk } from "../../store/slices/institutions/institutions.thunk";
import { createSecurityPermissionThunk, createSecurityRolThunk, updateSecurityPermissionThunk, updateSecurityRolesThunk } from "../../store/slices/security/security.thunk";
import { AppDispatch } from "../../store/store";
import { FormData, StoreKey } from "../interfaces/formSettings.interface";


type DispatchFunction = AppDispatch; // Replace with actual dispatch type
type ShowToastFunction = (message: string, type: "success" | "error") => void;

interface SubmitHandler {
  (formData: FormData): Promise<void>;
}

export const createSubmitHandlers = (
  dispatch: DispatchFunction,
  showToast: ShowToastFunction
): Record<StoreKey, SubmitHandler> => {
  return {
    updateUser: async (formData) => {
      const payload = {
        names: formData.names,
        surnames: formData.surnames,
        username: formData.username,
        email: formData.email,
        status: formData.status,
        institutionId: Number(formData.institutionId),
        roleIds: formData.roleIds,
      };
      
      try {
        if (formData.id) {
          await dispatch(updateUserThunk({ id: formData.id, payload }));
        }
        showToast("Usuario actualizado exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    },

    updateInstitution: async (formData) => {
      const payload = {
        name: formData.name,
        description: formData.description,
      };

      try {
        await dispatch(updateInstitutionsThunk({ id: formData.id, payload }));
        showToast("Institución actualizada exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    },

    updateRol: async (formData) => {
      const payload = {
        name: formData.name,
        description: formData.description,
        permissionsIds: formData.permissionId.map((p: string) => +p),
      };
      
      try {
        await dispatch(updateSecurityRolesThunk({ id: formData.id, payload }));
        showToast("Rol actualizado exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    },

    updatePermission: async (formData) => {
      const payload = {
        description: formData.description,
        actionId: +formData.action,
        resourceId: +formData.resource,
      };
      
      try {
        await dispatch(updateSecurityPermissionThunk({ id: formData.id, payload }));
        showToast("Permiso actualizado exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    },

    createUser: async (formData) => {
      const payload = {
        names: formData.names,
        surnames: formData.surnames,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        institutionId: formData.institutionId,
      };
      
      try {
        await dispatch(createUserThunk(payload)).unwrap();
        showToast("Usuario creado exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    },

    createInstitution: async (formData) => {
      const payload = {
        name: formData.name,
        description: formData.description,
      };
      
      try {
        await dispatch(createInstitutionThunk(payload)).unwrap();
        showToast("Institución creada exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    },

    createRol: async (formData) => {
      const payload = {
        name: formData.name,
        description: formData.description,
        permissionsIds: formData.permissionId.map((p: string) => +p),
      };
      
      try {
        await dispatch(createSecurityRolThunk(payload)).unwrap();
        showToast("Rol creado exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    },

    createPermission: async (formData) => {
      const payload = {
        description: formData.description,
        actionId: +formData.action,
        resourceId: +formData.resource,
      };
      
      try {
        await dispatch(createSecurityPermissionThunk(payload)).unwrap();
        showToast("Permiso creado exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    },
  };
};