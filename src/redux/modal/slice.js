import { createSlice } from '@reduxjs/toolkit';
import { appInitState } from '../constants';

const modalSlice = createSlice({
  name: 'modal',
  initialState: appInitState.modal,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.data = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.data = {};
    },
  },
  selectors: {
    selectIsOpen: (state) => state.isOpen,
    selectModalData: (state) => state.data,
  },
});

export const { selectIsOpen, selectModalData } = modalSlice.selectors;
export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
