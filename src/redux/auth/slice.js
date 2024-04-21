import { createSlice } from '@reduxjs/toolkit';
import { appInitState } from '../constants';
import { register, login, logout, refreshUser } from '../auth/operations';

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

const handleFulfilled = (state, action) => {
  state.isLoading = false;

  switch (action.type) {
    case 'auth/register/fulfilled':
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      return;
    case 'auth/login/fulfilled':
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      return;
    case 'auth/logout/fulfilled':
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      return;
    case 'auth/refresh/fulfilled':
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
      return;
    default:
      return state;
  }
};

const auth = createSlice({
  name: 'auth',
  initialState: appInitState.auth,
  reducers: {
    toggleIsLoggingOut: (state) => {
      state.isLoggingOut = !state.isLoggingOut;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, handlePending);
    builder.addCase(register.fulfilled, handleFulfilled);
    builder.addCase(register.rejected, handleRejected);
    builder.addCase(login.pending, handlePending);
    builder.addCase(login.fulfilled, handleFulfilled);
    builder.addCase(login.rejected, handleRejected);
    builder.addCase(logout.pending, handlePending);
    builder.addCase(logout.fulfilled, handleFulfilled);
    builder.addCase(logout.rejected, handleRejected);
    builder.addCase(refreshUser.pending, handlePending);
    builder.addCase(refreshUser.fulfilled, handleFulfilled);
    builder.addCase(refreshUser.rejected, handleRejected);
  },
  selectors: {
    selectAuthIsLoading: (state) => state.isLoading,
    selectAuthError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectUser: (state) => state.user,
    selectIsRefreshing: (state) => state.isRefreshing,
    selectIsLoggingOut: (state) => state.isLoggingOut,
  },
});

export const {
  selectAuthError,
  selectAuthIsLoading,
  selectIsLoggedIn,
  selectIsLoggingOut,
  selectIsRefreshing,
  selectUser,
} = auth.selectors;
export const { toggleIsLoggingOut } = auth.actions;
export const authReducer = auth.reducer;
