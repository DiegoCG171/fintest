import { createSlice } from "@reduxjs/toolkit";
import { ModalState } from "../../../../config/interfaces";
import { createTestCaseThunk } from "../../collections/collections.thunk";

const initialState: ModalState = {
    isOpen: false,
    componentKey: null,
    componentProps: undefined,
    loading: false
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
    extraReducers: (build) => {
        build.addCase(createTestCaseThunk.pending, (state) => {
            state.loading = true;
        })
        build.addCase(createTestCaseThunk.rejected, (state) => {
            state.loading = false;
            state.isOpen = false;
        })
        build.addCase(createTestCaseThunk.fulfilled, (state) => {
            state.loading = false;
            state.isOpen = false;
        })
    }
});

export const { openModal, closeModal } = modalFormSlice.actions;
