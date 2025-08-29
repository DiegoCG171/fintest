import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { UserDB, Users } from "../../../config/interfaces";
import { Institution } from "../../../config/interfaces/institutions.interface";
import { Permission, Rol } from "../../../config/interfaces/security.interface";
import {
  deleteUserThunk,
  getAllUsersThunk,
  updateUserThunk,
} from "../users/user.thunk";
import {
  deleteInstitutionsThunk,
  getAllInstitutionsThunk,
} from "../institutions/institutions.thunk";
import {
  deleteSecurityPermissionsThunk,
  deleteSecurityRolesThunk,
  getAllSecurityPermissionsThunk,
  getAllSecurityRolesThunk,
  updateSecurityPermissionThunk,
} from "../security/security.thunk";

interface InitialState {
  formActive: boolean;
  users: Users;
  institutions: Institution[];
  roles: Rol[];
  permissions: Permission[];
  updateUser?: UserDB;
  updateInstitution?: Institution;
  updateRol?: Rol;
  updatePermission?: Permission;
  type?: 'update' | 'create';
}

const initialState: InitialState = {
  formActive: false,
  users: {
    data: [],
    currentPage: 0,
    limit: 0,
    offset: 0,
    total: 0,
    totalPages: 0,
  },
  institutions: [],
  roles: [],
  permissions: [],
  updateUser: undefined,
  updateInstitution: undefined,
  updateRol: undefined,
  updatePermission: undefined,
  type: "update"
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUpdateUser: (state, action: PayloadAction<{type?: 'update' | "create", user?: UserDB}>) => {
      state.formActive = true;
      state.updateUser = action.payload.user;
      state.type = action.payload.type
    },
    setUpdateInstitution: (state, action: PayloadAction<Institution>) => {
      state.formActive = true;
      state.updateInstitution = action.payload;
    },
    setUpdateRol: (state, action: PayloadAction<Rol>) => {
      state.formActive = true;
      state.updateRol = action.payload;
    },
    setUpdatePermission: (state, action: PayloadAction<Permission>) => {
      state.formActive = true;
      state.updatePermission = action.payload;
    },
    closeModalSettings: (state) => {
      state.formActive = false;
      state.updateUser = undefined;
      state.updateInstitution = undefined;
      state.updateRol = undefined;
      state.updatePermission = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== USERS =====
      .addCase(getAllUsersThunk.fulfilled, (state, action: PayloadAction<Users>) => {
        state.users = action.payload;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.users.data = state.users.data.filter((user) => user.id !== action.payload);
        state.users.total -= 1;
      })
      .addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<AxiosResponse<UserDB>>) => {
        const updatedUser = action.payload.data;
        state.users.data = state.users.data.map((user) =>
          user.id === updatedUser.id ?  updatedUser : user
        );
        state.updateUser = undefined;
      })

      // ===== INSTITUTIONS =====
      .addCase(getAllInstitutionsThunk.fulfilled, (state, action: PayloadAction<Institution[]>) => {
        state.institutions = action.payload;
      })
      .addCase(deleteInstitutionsThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.institutions = state.institutions.filter((inst) => inst.id !== action.payload);
        state.updateInstitution = undefined;
      })

      // ===== ROLES =====
      .addCase(getAllSecurityRolesThunk.fulfilled, (state, action: PayloadAction<Rol[]>) => {
        state.roles = action.payload;
      })
      .addCase(deleteSecurityRolesThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.roles = state.roles.filter((rol) => rol.id !== action.payload);
        state.updateRol = undefined;
      })

      // ===== PERMISSIONS =====
      .addCase(getAllSecurityPermissionsThunk.fulfilled, (state, action: PayloadAction<Permission[]>) => {
        state.permissions = action.payload;
      })
      .addCase(deleteSecurityPermissionsThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.permissions = state.permissions.filter((perm) => perm.id !== action.payload);
      })
      .addCase(updateSecurityPermissionThunk.fulfilled, (state, action: PayloadAction<{ id: number; data: Partial<Permission> }>) => {
        const { id, data } = action.payload;
        const index = state.permissions.findIndex((perm) => perm.id === id);
        if (index !== -1) {
          state.permissions[index] = {
            ...state.permissions[index],
            ...data,
          };
        }
        state.updatePermission = undefined;
      });
  },
});

export const {
  setUpdateUser,
  setUpdateInstitution,
  setUpdateRol,
  setUpdatePermission,
  closeModalSettings,
} = adminSlice.actions;
