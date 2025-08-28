import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const settingsMenu = [
  {
    label: "Users",
    active: true,
    icon: "GroupsOutlinedIcon",
    path: "users",
  },
  {
    label: "Institutions",
    active: false,
    icon: "BusinessOutlinedIcon",
    path: "institutions",
  },
  {
    label: "Roles",
    active: false,
    icon: "AdminPanelSettingsOutlinedIcon",
    path: "roles",
  },
  {
    label: "Permissions",
    active: false,
    icon: "VpnKeyOutlinedIcon",
    path: "permissions",
  },
];


interface InitialState {
  menuOptions: MenuOptions[];
}

interface MenuOptions {
  label: string;
  icon: string;
  active: boolean;
  path: string;
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

export const {changeActiveMenuOption} = sidebarMenuSettingsSlice.actions;
