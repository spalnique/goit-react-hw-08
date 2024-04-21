import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from '../contacts/operations';
import { selectFiltersName } from '../filter/slice';
import { appInitState } from '../constants';

const handlePending = (state) => {
  state.error = null;
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: appInitState.contacts,

  reducers: {
    toggleIsEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
    toggleIsDeleting: (state) => {
      state.isDeleting = !state.isDeleting;
    },
    resetItems: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.reduce((acc, contact) => {
          contact.id !== action.payload.id && acc.push(contact);
          return acc;
        }, []);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(updateContact.pending, handlePending)
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.map((contact) =>
          contact.id === action.payload.id
            ? {
                ...contact,
                name: action.payload.name,
                number: action.payload.number,
              }
            : contact
        );
      })
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

export const { resetItems, toggleIsEditing, toggleIsDeleting } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
