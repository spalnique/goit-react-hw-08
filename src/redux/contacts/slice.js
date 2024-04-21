import { createSelector, createSlice } from '@reduxjs/toolkit';
import { appInitState } from '../constants';
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from '../contacts/operations';
import { selectFiltersName } from '../filter/slice';

const handlePending = (state) => {
  state.error = null;
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFulfilled = (state, action) => {
  switch (action.type) {
    case 'contacts/fetchAll/fulfilled':
      state.isLoading = false;
      state.items = action.payload;
      return;
    case 'contacts/addContact/fulfilled':
      state.isLoading = false;
      state.items.push(action.payload);
      return;
    case 'contacts/deleteContact/fulfilled':
      state.isLoading = false;
      state.items = state.items.reduce((acc, contact) => {
        contact.id !== action.payload.id && acc.push(contact);
        return acc;
      }, []);
      return;
    case 'contacts/updateContact/fulfilled':
      state.isLoading = false;
      console.log('action.payload:', action.payload);
      state.items = state.items.map((contact) =>
        contact.id === action.payload.id
          ? {
              ...contact,
              name: action.payload.name,
              number: action.payload.number,
            }
          : contact
      );
      return;
    default:
      return state;
  }
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: appInitState.contacts,

  reducers: {
    toggleIsEditing(state) {
      state.isEditing = !state.isEditing;
    },
    toggleIsDeleting(state) {
      state.isDeleting = !state.isDeleting;
    },
  },

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
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(updateContact.pending, handlePending)
      .addCase(updateContact.fulfilled, handleFulfilled)
      .addCase(updateContact.rejected, handleRejected);
  },

  selectors: {
    selectContacts: (state) => state.items,
    selectError: (state) => state.error,
    selectIsLoading: (state) => state.isLoading,
    selectIsEditing: (state) => state.isEditing,
    selectIsDeleting: (state) => state.isDeleting,
  },
});

export const {
  selectContacts,
  selectError,
  selectIsDeleting,
  selectIsEditing,
  selectIsLoading,
} = contactsSlice.selectors;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFiltersName],
  (contacts, filterValue) =>
    contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filterValue.toLowerCase()) ||
        number.includes(filterValue)
    )
);

export const { editContact, toggleIsEditing, toggleIsDeleting } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
