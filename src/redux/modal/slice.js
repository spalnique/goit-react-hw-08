import { createSlice } from '@reduxjs/toolkit';
import { appInitState } from '../constants';
import { deleteContact, updateContact } from '../contacts/operations';
import { logout } from '../auth/operations';

const modalSlice = createSlice({
  name: 'modal',
  initialState: appInitState.modal,
  reducers: {
    onOpen: (state, action) => {
      state.type = action.payload.type;
      state.isOpen = true;
      if (action.payload.type !== 'logout') {
        state.data = action.payload.data;
      }
    },
    onClose: (state) => {
      state.isOpen = false;
      state.data = {};
      state.type = '';
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(deleteContact.fulfilled, (state) => {
        state.isOpen = false;
        state.data = {};
        state.type = '';
      })
      .addCase(logout.fulfilled, (state) => {
        state.isOpen = false;
        state.data = {};
        state.type = '';
      })
      .addCase(updateContact.fulfilled, (state) => {
        state.isOpen = false;
        state.data = {};
        state.type = '';
      }),

  selectors: {
    selectIsOpen: (state) => state.isOpen,
    selectModalData: (state) => state.data,
    selectModalType: (state) => state.type,
  },
});

export const { selectIsOpen, selectModalData, selectModalType } =
  modalSlice.selectors;
export const { onOpen, onClose } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
