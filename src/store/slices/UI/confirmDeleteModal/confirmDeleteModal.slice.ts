
import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  loading: boolean;
  resource: 'testCase' | 'collection' | 'template' | 'category' | 'default';
  id: string;
}

const initialState: ModalState = {
  isOpen: false,
  loading: false,
  id: '',
  resource: 'default'
};

export const confirmDeleteModalSlice = createSlice({
  name: 'confirmDeleteModal',
  initialState,
  reducers: {
    openConfirmDeleteModal: (state, action) => {
        state.isOpen = true;
        state.id = action.payload.id;
        state.resource = action.payload.resource
    },
    closeConfirmDeleteModal: (state) => {
        state.isOpen = false;
    },
  }
});

export const { openConfirmDeleteModal, closeConfirmDeleteModal } = confirmDeleteModalSlice.actions;