import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { axiosConfig as config } from '../constants';

const setAuthorizationToken = (token) => {
  config.headers.Authorization = `Bearer ${token}`;
};

const clearAuthorizationToken = () => {
  config.headers.Authorization = null;
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const promise = axios.post('/users/signup', credentials, config);
      toast.promise(
        promise,
        {
          loading: 'Registering...',
          success: `Welcome, ${credentials.name}`,
          error: 'Something went wrong. Please, try again later.',
        },
        { duration: 2500, id: 'register' }
      );
      const response = await promise;
      setAuthorizationToken(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const promise = axios.post('/users/login', credentials, config);
      toast.promise(
        promise,
        {
          loading: 'Logging in...',
          error: 'Something went wrong. Please, try again later.',
        },
        { duration: 2500, id: 'login' }
      );
      const response = await promise;
      toast.promise(
        promise,
        {
          success: `Welcome back, ${response.data.user.name}`,
        },
        { duration: 2500, id: 'login' }
      );
      setAuthorizationToken(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const { name } = thunkAPI.getState().auth.user;
    const promise = axios.post(`/users/logout`, _, config);
    toast.promise(
      promise,
      {
        loading: 'Logging out...',
        success: `See you soon, ${name}!`,
        error: 'Something went wrong. Please, try again later.',
      },
      { duration: 2500, id: 'logout' }
    );
    const response = await promise;
    clearAuthorizationToken();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;
    if (!persistedToken)
      return thunkAPI.rejectWithValue('Unable to fetch user');
    try {
      setAuthorizationToken(persistedToken);
      const promise = axios.get('/users/current', config);
      toast.promise(
        promise,
        {
          loading: 'Fetching user data...',
          success: 'Fetching complete!',
          error: "Couldn't retrieve user data.",
        },
        { duration: 2500, id: 'refresh' }
      );
      const response = await promise;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
