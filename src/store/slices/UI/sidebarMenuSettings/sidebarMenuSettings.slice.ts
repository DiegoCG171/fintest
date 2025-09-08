import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const settingsMenu = [
  {
    label: "Users",
    active: true,
    icon: "GroupsOutlinedIcon",
    path: "users",
    requiredPermissions: [
      { action: "read", resource: "user" },
      { action: "create", resource: "user" },
      { action: "update", resource: "user" },
      { action: "delete", resource: "user" },
    ],
  },
  {
    label: "Institutions",
    active: false,
    icon: "BusinessOutlinedIcon",
    path: "institutions",
    requiredPermissions: [
      { action: "read", resource: "institution" },
      { action: "create", resource: "institution" },
      { action: "update", resource: "institution" },
      { action: "delete", resource: "institution" },
    ],
  },
  {
    label: "Roles",
    active: false,
    icon: "AdminPanelSettingsOutlinedIcon",
    path: "roles",
    requiredPermissions: [
      { action: "read", resource: "rol" },
      { action: "create", resource: "rol" },
      { action: "update", resource: "rol" },
      { action: "delete", resource: "rol" },
    ],
  },
  {
    label: "Permissions",
    active: false,
    icon: "VpnKeyOutlinedIcon",
    path: "permissions",
    requiredPermissions: [
      { action: "read", resource: "permission" },
      { action: "create", resource: "permission" },
      { action: "update", resource: "permission" },
      { action: "delete", resource: "permission" },
    ],
  },
];

interface InitialState {
  menuOptions: MenuOptions[];
}

interface PermissionRequirement {
  action: string;
  resource: string;
}

interface MenuOptions {
  label: string;
  icon: string;
  active: boolean;
  path: string;
  requiredPermissions?: PermissionRequirement[]; // ✅ ahora es opcional
}

const initialState: InitialState = {
  menuOptions: settingsMenu,
};

export const sidebarMenuSettingsSlice = createSlice({
  name: "sidebarMenuSettings",
  initialState,
  reducers: {
    changeActiveMenuOption: (state, action: PayloadAction<string>) => {
      state.menuOptions.forEach((option) => {
        option.active = option.label === action.payload;
      });
    },
  },
});

export const { changeActiveMenuOption } = sidebarMenuSettingsSlice.actions;
