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
    
      const userConfig = await updateUserConfig(updateConfig)
      return userConfig;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);