import { createSlice } from '@reduxjs/toolkit';
import { actionType, appInitState } from '../constants';
import { deleteContact, updateContact } from '../contacts/operations';
import { logout } from '../auth/operations';

const { actionLogout } = actionType;

const modalSlice = createSlice({
  name: 'modal',
  initialState: appInitState.modal,
  reducers: {
    onOpen: (state, action) => {
      state.actionType = action.payload.actionType;
      state.isOpen = true;
      if (action.payload.actionType !== actionLogout) {
        state.data = action.payload.data;
      }
    },
    onClose: (state) => {
      state.isOpen = false;
      state.data = {};
      state.actionType = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(deleteContact.fulfilled, (state) => {
        state.isOpen = false;
        state.data = {};
        state.actionType = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isOpen = false;
        state.data = {};
        state.actionType = null;
      })
      .addCase(updateContact.fulfilled, (state) => {
        state.isOpen = false;
        state.data = {};
        state.actionType = null;
      }),

  // selectors: {
  //   selectIsOpen: (state) => state.isOpen,
  //   selectModalData: (state) => state.data,
  //   selectModalAction: (state) => state.actionType,
  // },
});

// export const { selectIsOpen, selectModalData, selectModalAction } =
//   modalSlice.selectors;
export const { onOpen, onClose } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
