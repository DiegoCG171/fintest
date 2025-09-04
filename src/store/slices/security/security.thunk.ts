import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSecurityPermission, createSecurityRol, deleteSecurityPermissions, deleteSecurityRoles, getAllSecurityAction, getAllSecurityPermissions, getAllSecurityResource, getAllSecurityRoles, updateSecurityPermission, updateSecurityRoles } from "../../../services/catalogs/security.service"
import { CreateSecurityPermission, CreateSecurityRol, Permission, Rol } from "../../../config/interfaces/security.interface"

export const getAllSecurityRolesThunk = createAsyncThunk('security/getAllRoles', async (_, {rejectWithValue}) => {
    try {
       return await getAllSecurityRoles()
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getAllSecurityPermissionsThunk = createAsyncThunk('security/getAllPermissions', async (_, {rejectWithValue}) => {
    try {
       return await getAllSecurityPermissions()
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getAllSecurityActionsThunk = createAsyncThunk('security/getAllActions', async (_, {rejectWithValue}) => {
    try {
       return await getAllSecurityAction()
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getAllSecurityResourcesThunk = createAsyncThunk('security/getAllResources', async (_, {rejectWithValue}) => {
    try {
       return await getAllSecurityResource()
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createSecurityRolThunk = createAsyncThunk<
    Rol,
    CreateSecurityRol,
    { rejectValue: string }
>(
    'security/createRol',
    async (role: CreateSecurityRol, { rejectWithValue }) => {
        try {
          return await createSecurityRol(role)
        } catch (error) {
            return rejectWithValue(error as string)
        }
    }
)

export const createSecurityPermissionThunk = createAsyncThunk<
    Permission,
    CreateSecurityPermission,
    { rejectValue: string }
>(
    'security/createPermission',
    async (permission: CreateSecurityPermission, { rejectWithValue }) => {
        try {
          return await createSecurityPermission(permission)
        } catch (error) {
            return rejectWithValue(error as string)
        }
    }
)

export const deleteSecurityRolesThunk = createAsyncThunk('security/removeSecurityRole', async (id: string, {rejectWithValue}) => {
    try {
       await deleteSecurityRoles(id);
       return id;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteSecurityPermissionsThunk = createAsyncThunk('security/removeSecurityPermissions', async (id: string, {rejectWithValue}) => {
    try {
       await deleteSecurityPermissions(id)
        return +id;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateSecurityRolesThunk = createAsyncThunk("security/updateSecurityRole", async ({ id, payload }: {id: string, payload: Partial<Rol>}, { rejectWithValue }) => {
  try {
    const user = await updateSecurityRoles(id, payload);
    return user;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const updateSecurityPermissionThunk = createAsyncThunk("security/updateSecurityPermission", async ({ id, payload }: {id: string, payload: Partial<Permission>}, { rejectWithValue }) => {
  try {
    await updateSecurityPermission(id, payload);
    return {id: +id, data: payload};
  } catch (error) {
    return rejectWithValue(error as string);
  }
});