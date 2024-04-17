import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filter/selectors';

export const selectContacts = (state) => state.contacts.items;
export const selectError = (state) => state.contacts.error;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectFilteredContacts = createSelector(
  [selectNameFilter, selectContacts],
  (filter, contacts) =>
    contacts.filter(
      ({ name, phone }) =>
        name.toLowerCase().includes(filter.toLowerCase()) ||
        phone.includes(filter)
    )
);
