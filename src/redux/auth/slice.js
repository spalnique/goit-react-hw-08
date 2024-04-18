import { createSlice } from '@reduxjs/toolkit';
import { appInitState } from '../constants';
import { signup, signin, signout, refreshUser } from '../auth/operations';

const handlePending = (state, action) => {
  state.isLoading = true;
  state.error = null;
  if (action.type === 'auth/refreshUser/pending') {
    state.isRefreshing = true;
  }
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  if (action.type === 'auth/refreshUser/rejected') {
    state.isRefreshing = false;
  }
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;

  switch (action.type) {
    case 'auth/signup/fulfilled' || 'auth/signin/fulfilled':
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      return;
    case 'auth/signout/fulfilled':
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      return;
    case 'auth/refreshUser/fulfilled':
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
  extraReducers: (builder) => {
    builder.addCase(signup.pending, handlePending);
    builder.addCase(signup.fulfilled, handleFulfilled);
    builder.addCase(signup.rejected, handleRejected);
    builder.addCase(signin.pending, handlePending);
    builder.addCase(signin.fulfilled, handleFulfilled);
    builder.addCase(signin.rejected, handleRejected);
    builder.addCase(signout.pending, handlePending);
    builder.addCase(signout.fulfilled, handleFulfilled);
    builder.addCase(signout.rejected, handleRejected);
    builder.addCase(refreshUser.pending, handlePending);
    builder.addCase(refreshUser.fulfilled, handleFulfilled);
    builder.addCase(refreshUser.rejected, handleRejected);
  },
});
export const authReducer = auth.reducer;
