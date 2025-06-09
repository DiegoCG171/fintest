import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "../../../../config/interfaces";

const initialState: ModalState = {
    isOpen: false,
    mode: 'create',
};

export const modalFormSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ mode: 'create' | 'edit'}>) => {
            state.isOpen = true;
            state.mode = action.payload.mode;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalFormSlice.actions;