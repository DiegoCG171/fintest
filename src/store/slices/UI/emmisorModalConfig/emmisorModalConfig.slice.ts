import { createSlice } from "@reduxjs/toolkit";


interface EmmisorModalConfigState {
  isOpen: boolean;
  loading: boolean;
}

const initialState: EmmisorModalConfigState = {
    isOpen: false,
    loading: false
};

export const emmisorModalConfigSlice = createSlice({
  name: "configHostModal",
  initialState,
  reducers: {
    toggleEmmisorModalConfig: (state, action) => {
      state.isOpen = action.payload;
    }
  },
});

export const { toggleEmmisorModalConfig } =  emmisorModalConfigSlice.actions