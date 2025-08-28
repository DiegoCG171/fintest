import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDB, Users } from "../../../config/interfaces";
import { getAllUsersThunk } from "../users/user.thunk";
import { Institution } from "../../../config/interfaces/institutions.interface";
import { getAllInstitutionsThunk } from "../institutions/institutions.thunk";
import { Permission, Rol } from "../../../config/interfaces/security.interface";
import { getAllSecurityPermissionsThunk, getAllSecurityRolesThunk } from "../security/security.thunk";

interface InitialState {
  formActive: boolean;
  users: Users;
  institutions: Institution[];
  roles: Rol[];
  permissions: Permission[]
  updateUser?: UserDB;
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
  permissions: []
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUpdateUser: (state, action) => {
      state.formActive = true;
      state.updateUser = action.payload;
    },
    closeModalSettings: (state) => {
      state.formActive = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        getAllUsersThunk.fulfilled,
        (state, action: PayloadAction<Users>) => {
          state.users = action.payload;
        }
      )
      .addCase(
        getAllInstitutionsThunk.fulfilled,
        (state, action: PayloadAction<Institution[]>) => {
          state.institutions = action.payload;
        }
      )
      .addCase(
        getAllSecurityRolesThunk.fulfilled,
        (state, action: PayloadAction<Rol[]>) => {
          state.roles = action.payload;
        }
      )
      .addCase(
        getAllSecurityPermissionsThunk.fulfilled,
        (state, action: PayloadAction<Permission[]>) => {
          state.permissions = action.payload;
        }
      )
  },
});

export const { setUpdateUser, closeModalSettings } = adminSlice.actions;
