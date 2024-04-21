import { createSlice } from '@reduxjs/toolkit';
import { appInitState } from '../constants';
// import { toggleIsDeleting, toggleIsEditing } from '../contacts/slice';
// import { toggleIsLoggingOut } from '../auth/slice';
// import { deleteContact, updateContact } from '../contacts/operations';
// import { logout } from '../auth/operations';

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

    // не використовуються, ібо не працюють ):

    // onEditOpen: (state, action) => {
    //   state.isOpen = true;
    //   state.data = action.payload;
    //   toggleIsEditing();
    // },
    // onEditClose: (state) => {
    //   state.isOpen = false;
    //   toggleIsEditing();
    //   updateContact(state.data.id);
    //   state.data = {};
    // },
    // onDeleteOpen: (state, action) => {
    //   state.isOpen = true;
    //   state.data = action.payload;
    //   toggleIsDeleting();
    // },
    // onDeleteClose: (state) => {
    //   state.isOpen = false;
    //   toggleIsDeleting();
    //   deleteContact(state.data.id);
    //   state.data = {};
    // },
    // onLogoutOpen: (state) => {
    //   state.isOpen = true;
    //   toggleIsLoggingOut();
    // },
    // onLogoutClose: (state) => {
    //   state.isOpen = false;
    //   logout();
    // },
  },
  selectors: {
    selectIsOpen: (state) => state.isOpen,
    selectModalData: (state) => state.data,
  },
});

export const { selectIsOpen, selectModalData } = modalSlice.selectors;
export const {
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
