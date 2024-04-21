import { createSlice } from '@reduxjs/toolkit';
import { appInitState } from '../constants';
import { deleteContact, updateContact } from '../contacts/operations';
import { logout } from '../auth/operations';

const modalSlice = createSlice({
  name: 'modal',
  initialState: appInitState.modal,
  reducers: {
    onEditOpen: (state, action) => {
      state.isOpen = true;
      state.data = action.payload;
    },
    // onEditClose: (state) => {
    //   state.isOpen = false;
    //   state.data = {};
    // },
    onDeleteOpen: (state, action) => {
      state.isOpen = true;
      state.data = action.payload;
    },
    // onDeleteClose: (state) => {
    //   state.isOpen = false;
    //   state.data = {};
    // },
    onLogoutOpen: (state) => {
      state.isOpen = true;
    },
    // onLogoutClose: (state) => {
    //   state.isOpen = false;
    // },
    onClose: (state) => {
      state.isOpen = false;
      state.data = {};
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(deleteContact.fulfilled, (state) => {
        state.isOpen = false;
        state.data = {};
      })
      .addCase(logout.fulfilled, (state) => {
        state.isOpen = false;
        state.data = {};
      })
      .addCase(updateContact.fulfilled, (state) => {
        state.isOpen = false;
        state.data = {};
      }),

  selectors: {
    selectIsOpen: (state) => state.isOpen,
    selectModalData: (state) => state.data,
  },
});

export const { selectIsOpen, selectModalData } = modalSlice.selectors;
export const {
  onClose,
  onEditOpen,
  onEditClose,
  onDeleteOpen,
  onDeleteClose,
  onLogoutOpen,
  onLogoutClose,
  openModal,
  closeModal,
} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
