import { createSlice } from '@reduxjs/toolkit';
import { appInitState } from './constants';
import { addContact, deleteContact, fetchContacts } from './contactsOps';

const handlePending = (state) => {
  state.error = null;
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const handleFulfilled = (state, action) => {
  switch (action.type) {
    case 'contacts/fetchAll/fulfilled':
      state.loading = false;
      state.items = action.payload;
      break;
    case 'contacts/addContact/fulfilled':
      state.loading = false;
      state.items.push(action.payload);
      break;
    case 'contacts/deleteContact/fulfilled':
      state.loading = false;
      state.items = state.items.reduce((acc, contact) => {
        contact.id !== action.payload.id && acc.push(contact);
        return acc;
      }, []);
      break;
    default:
      state;
  }
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: appInitState.contacts,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleFulfilled)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, handleFulfilled)
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, handleFulfilled)
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
