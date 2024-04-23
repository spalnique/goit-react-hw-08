import { createSelector } from '@reduxjs/toolkit';

import { selectFiltersName } from '../filter/selectors';

export const selectContacts = (state) => state.items;
export const selectError = (state) => state.error;
export const selectIsLoading = (state) => state.isLoading;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFiltersName],
  (contacts, filterValue) =>
    contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filterValue.toLowerCase()) ||
        number.includes(filterValue)
    )
);
