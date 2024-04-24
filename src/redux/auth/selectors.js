// export const selectAuthIsLoading = (state) => state.isLoading;
// export const selectAuthError = (state) => state.error;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectUser = (state) => state.auth.user;
