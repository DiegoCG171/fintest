import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDB, Users } from "../../../config/interfaces";
import {
  Institution,
  Institutions,
} from "../../../config/interfaces/institutions.interface";
import {
  Actions,
  Permission,
  Permissions,
  Resources,
  Rol,
  Roles,
  Rules,
} from "../../../config/interfaces/security.interface";
import {
  createUserThunk,
  deleteUserThunk,
  getAllUsersThunk,
  updateUserThunk,
} from "../users/user.thunk";
import {
  createInstitutionThunk,
  deleteInstitutionsThunk,
  getAllInstitutionsThunk,
  updateInstitutionsThunk,
} from "../institutions/institutions.thunk";
import {
  createSecurityPermissionThunk,
  createSecurityRolThunk,
  deleteSecurityPermissionsThunk,
  deleteSecurityRolesThunk,
  getAllSecurityActionsThunk,
  getAllSecurityPermissionsMenuOptionsThunk,
  getAllSecurityPermissionsThunk,
  getAllSecurityResourcesThunk,
  getAllSecurityRolesThunk,
  updateSecurityPermissionThunk,
  updateSecurityRolesThunk,
} from "../security/security.thunk";
import { initialAdminState } from "./admin.state";
import {
  createExtractionRuleThunk,
  deleteExtractionRuleThunk,
  getAllExtractionRulesThunk,
  updateExtractionRulesThunk,
} from "../extractionsRules/extractionRules.thunk";

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialAdminState,
  reducers: {
    setUpdateUser: (
      state,
      action: PayloadAction<{ type?: "update" | "create"; user?: UserDB }>
    ) => {
      state.formActive = true;
      state.updateUser = action.payload.user;
      state.type = action.payload.type;
    },
    setUpdateInstitution: (
      state,
      action: PayloadAction<{
        type?: "update" | "create";
        institution?: Institution;
      }>
    ) => {
      state.formActive = true;
      state.updateInstitution = action.payload.institution;
      state.type = action.payload.type;
    },
    setUpdateRol: (
      state,
      action: PayloadAction<{ type?: "update" | "create"; role?: Rol }>
    ) => {
      state.formActive = true;
      state.updateRol = action.payload.role;
      state.type = action.payload.type;
    },
    setUpdatePermission: (
      state,
      action: PayloadAction<{
        type?: "update" | "create";
        permission?: Permission;
      }>
    ) => {
      state.formActive = true;
      state.updatePermission = action.payload.permission;
      state.type = action.payload.type;
    },
    closeModalSettings: (state) => {
      state.formActive = false;
      state.updateUser = undefined;
      state.updateInstitution = undefined;
      state.updateRol = undefined;
      state.updatePermission = undefined;
    },
    resetPermissionsMenuOptions: (state) => {
      state.permissions.menuOptions = [];
    },
    activExtractionRules: (state, action: PayloadAction<boolean>) => {
      state.extractionRulesActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllUsersThunk.fulfilled,
        (state, action: PayloadAction<Users>) => {
          state.users = action.payload;
          state.searchTerm = action.payload.searchTerm;
        }
      )
      .addCase(
        deleteUserThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.users.data = state.users.data.filter(
            (user) => user.id !== action.payload
          );
          state.users.total -= 1;
          state.users.totalSearch -= 1;
        }
      )
      .addCase(
        updateUserThunk.fulfilled,
        (state, action: PayloadAction<UserDB>) => {
          state.users.data = state.users.data.map((user) =>
            user.id === action.payload.id ? action.payload : user
          );
          state.updateUser = undefined;
        }
      )
      .addCase(
        createUserThunk.fulfilled,
        (state, action: PayloadAction<UserDB>) => {
          state.users.data.push(action.payload);
          state.users.total += 1;
          state.users.totalSearch += 1;
        }
      )

      .addCase(
        getAllInstitutionsThunk.fulfilled,
        (state, action: PayloadAction<Institutions>) => {
          state.institutions = action.payload;
          state.searchTerm = action.payload.searchTerm;
        }
      )
      .addCase(
        deleteInstitutionsThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.institutions.data = state.institutions.data.filter(
            (inst) => inst.id !== action.payload
          );
          state.updateInstitution = undefined;
          state.institutions.total -= 1;
          state.institutions.totalSearch -= 1;
        }
      )
      .addCase(createInstitutionThunk.fulfilled, (state, action) => {
        state.institutions.data.push(action.payload);
        state.institutions.total += 1;
        state.institutions.totalSearch += 1;
      })
      .addCase(
        updateInstitutionsThunk.fulfilled,
        (state, action: PayloadAction<Institution>) => {
          state.institutions.data = state.institutions.data.map((inst) =>
            inst.id === action.payload.id ? action.payload : inst
          );
          state.updateInstitution = undefined;
        }
      )
      .addCase(
        getAllSecurityRolesThunk.fulfilled,
        (state, action: PayloadAction<Roles>) => {
          state.roles = action.payload;
          state.searchTerm = action.payload.searchTerm;
        }
      )
      .addCase(
        createSecurityRolThunk.fulfilled,
        (state, action: PayloadAction<Rol>) => {
          state.roles.data.push(action.payload);
          state.roles.total += 1;
          state.roles.totalSearch += 1;
        }
      )
      .addCase(
        deleteSecurityRolesThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.roles.data = state.roles.data.filter(
            (rol) => rol.id !== action.payload
          );
          state.updateRol = undefined;
          state.roles.total -= 1;
          state.roles.totalSearch -= 1;
        }
      )
      .addCase(
        updateSecurityRolesThunk.fulfilled,
        (state, action: PayloadAction<Rol>) => {
          state.roles.data = state.roles.data.map((rol) =>
            rol.id === action.payload.id ? action.payload : rol
          );
          state.updateRol = undefined;
        }
      )

      // ===== PERMISSIONS =====
      .addCase(
        getAllSecurityPermissionsThunk.fulfilled,
        (state, action: PayloadAction<Permissions>) => {
          state.permissions = { ...state.permissions, ...action.payload };
          state.searchTerm = action.payload.searchTerm;
        }
      )
      .addCase(
        getAllSecurityPermissionsMenuOptionsThunk.fulfilled,
        (state, action) => {
          const page = action.meta?.arg?.page ?? 1;

          if (page === 1) {
            // resetea solo si aún no hay datos
            state.permissions.menuOptions =
              state.permissions.menuOptions.length === 0
                ? action.payload.data
                : state.permissions.menuOptions;
          } else {
            state.permissions.menuOptions = [
              ...state.permissions.menuOptions,
              ...action.payload.data,
            ];
          }
        }
      )

      .addCase(
        createSecurityPermissionThunk.fulfilled,
        (state, action: PayloadAction<Permission>) => {
          state.permissions.data.push(action.payload);
          state.permissions.total += 1;
          state.permissions.totalSearch += 1;
        }
      )
      .addCase(
        deleteSecurityPermissionsThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.permissions.data = state.permissions.data.filter(
            (perm) => perm.id !== action.payload
          );
          state.updatePermission = undefined;
          state.permissions.total -= 1;
          state.permissions.totalSearch -= 1;
        }
      )
      .addCase(
        updateSecurityPermissionThunk.fulfilled,
        (
          state,
          action: PayloadAction<{ id: number; data: Partial<Permission> }>
        ) => {
          const { id, data } = action.payload;
          const index = state.permissions.data.findIndex(
            (perm) => perm.id === id
          );
          if (index !== -1) {
            state.permissions.data[index] = {
              ...state.permissions.data[index],
              ...data,
            };
          }
          state.updatePermission = undefined;
        }
      )

      .addCase(
        getAllSecurityActionsThunk.fulfilled,
        (state, action: PayloadAction<Actions>) => {
          state.actions = action.payload;
          state.searchTerm = action.payload.searchTerm;
        }
      )
      .addCase(
        getAllSecurityResourcesThunk.fulfilled,
        (state, action: PayloadAction<Resources>) => {
          state.resources = action.payload;
          state.searchTerm = action.payload.searchTerm;
        }
      )
      .addCase(
        getAllExtractionRulesThunk.fulfilled,
        (state, action: PayloadAction<Rules>) => {
          state.rules = action.payload;
          state.searchTerm = action.payload.searchTerm;
        }
      )
      .addCase(
        createExtractionRuleThunk.fulfilled,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state, action: PayloadAction<any>) => {
          state.rules.data.push(action.payload);
          state.rules.total += 1;
          state.rules.totalSearch += 1;

          state.updateRules = undefined;
        }
      )
      .addCase(
        deleteExtractionRuleThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.rules.data = state.rules.data.filter(
            (perm) => perm.id !== action.payload
          );
          state.updatePermission = undefined;
          state.rules.total -= 1;
          state.rules.totalSearch -= 1;
        }
      )
      .addCase(
        updateExtractionRulesThunk.fulfilled,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state, action: PayloadAction<{ id: string; data: any }>) => {
          const { id, data } = action.payload;

          const index = state.rules.data.findIndex(
            (rule) => String(rule.uuid) === String(id)
          );
          if (index !== -1) {
            state.rules.data[index] = {
              ...state.rules.data[index],
              ...data,
            };
          }

          state.updateRules = undefined;
        }
      );
  },
});

export const {
  setUpdateUser,
  setUpdateInstitution,
  setUpdateRol,
  setUpdatePermission,
  closeModalSettings,
  resetPermissionsMenuOptions,
  activExtractionRules,
} = adminSlice.actions;
