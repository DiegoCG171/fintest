import { createSlice } from "@reduxjs/toolkit";
import { ModalState } from "../../../../config/interfaces";

const initialState: ModalState = {
    isOpen: false,
    componentKey: null,
    componentProps: undefined
};

export const modalFormSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (
            state,
            action
        ) => {
            state.isOpen = true;
            state.componentKey = action.payload.componentKey;
            state.componentProps = action.payload.componentProps;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.componentKey = null;
            state.componentProps = undefined;
        },
    },
});

export const { openModal, closeModal } = modalFormSlice.actions;
