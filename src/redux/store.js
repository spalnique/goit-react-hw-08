import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { contactsReducer } from './contacts/slice';
import { filterReducer } from './filter/slice';
import { modalReducer } from './modal/slice';
import { authPersistConfig } from './constants';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    contacts: contactsReducer,
    filters: filterReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
