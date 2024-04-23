import { createSlice } from '@reduxjs/toolkit';
import { appInitState } from '../constants';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: appInitState.filters,
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
    },
  },
  // selectors: {
  //   selectFiltersName: (state) => state.name,
  // },
});

// export const { selectFiltersName } = filtersSlice.selectors;
export const { changeFilter } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;
