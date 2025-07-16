import { createSlice } from "@reduxjs/toolkit";
import { removeSessionThunk } from "../../sessions/session.thunk";

interface ModalState {
  isOpen: boolean;
  loading: boolean;
}

const initialState: ModalState = {
  isOpen: false,
  loading: false,
};

export const modalConfirmSessionSlice = createSlice({
  name: "modalConfirmSession",
  initialState,
  reducers: {
    toggleConfirmSessionModal: (state, action) => {
      state.isOpen = action.payload;
    },
  },
  extraReducers: (build) => {
    build.addCase(removeSessionThunk.fulfilled, (state) => {
      state.isOpen = false
    })
  }
});

export const { toggleConfirmSessionModal } = modalConfirmSessionSlice.actions;
