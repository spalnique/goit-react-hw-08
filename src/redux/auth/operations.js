import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { baseURL } from '../constants';

const setAuthorizationToken = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthorizationToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

const axiosAuth = axios.create({ baseURL });

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const promise = axiosAuth.post('/users/signup', credentials);
      toast.promise(promise, {
        loading: 'Registering...',
        success: `Welcome, ${credentials.name}`,
        error: 'Something went wrong. Please, try again later.',
      });
      const response = await promise;
      setAuthorizationToken(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const promise = axiosAuth.post('/users/login', credentials);
      toast.promise(promise, {
        loading: 'Logging in...',
        success: `Welcome back!`,
        error: 'Something went wrong. Please, try again later.',
      });
      const response = await promise;
      setAuthorizationToken(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const promise = axiosAuth.post(`/users/logout`);
    toast.promise(promise, {
      loading: 'Logging out...',
      success: `See you soon!`,
      error: 'Something went wrong. Please, try again later.',
    });
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
      const response = await axiosAuth.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
