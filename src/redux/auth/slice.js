import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from '../auth/operations';
import { appInitState } from '../constants';

const handlePending = (state, action) => {
  state.isLoading = true;
  state.error = null;
  if (action.type === 'auth/refresh/pending') {
    state.isRefreshing = true;
  }
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  if (action.type === 'auth/refresh/rejected') {
    state.isRefreshing = false;
  }
};

const auth = createSlice({
  name: 'auth',
  initialState: appInitState.auth,

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...action.payload.user };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, handleRejected);

    builder
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, handleRejected);

    builder
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, handleRejected);

    builder
      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, handleRejected);
  },
  selectors: {
    selectUser: (state) => state.user,
    selectAuthIsLoading: (state) => state.isLoading,
    selectAuthError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsRefreshing: (state) => state.isRefreshing,
  },
});

export const {
  selectAuthError,
  selectAuthIsLoading,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectUser,
} = auth.selectors;

export const authReducer = auth.reducer;
