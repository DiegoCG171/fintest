import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserConfig, updateUserConfig } from "../../../services/catalogs/usersConfig.service";
import { UserConfigPayload } from "../../../config/interfaces";

export const getConfigUserThunk = createAsyncThunk(
  'users/getConfigUser',
  async (userId: string, { rejectWithValue }) => {
    try {
    
      const userConfig = await getUserConfig(userId)
      return userConfig;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateConfigUserThunk = createAsyncThunk(
  'users/updateConfigUser',
  async (updateConfig: UserConfigPayload, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (user.id === updateConfig.userId) {
        const updatedUser = { ...user, userConfiguration: updateConfig };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      const userConfig = await updateUserConfig(updateConfig)
      return userConfig;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);